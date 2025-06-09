from flask import Flask, jsonify, request, send_from_directory
import pandas as pd
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from utils import fetch_finnhub_ipos

# ML/NLP imports
from aiml.ipo_predict import predict_listing_gain
from aiml.sentiment_scrape import get_ipo_sentiment

app = Flask(__name__, static_folder=None)
app.config['JWT_SECRET_KEY'] = 'your-secret-key-here'  # Change this in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
CORS(app, resources={r"/api/*": {"origins": "*"}})
db.init_app(app)
jwt = JWTManager(app)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Missing username or password"}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username already exists"}), 409

    user = User(
        username=data['username'],
        password_hash=generate_password_hash(data['password'])
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Signup successful"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Missing username or password"}), 400

    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({"msg": "Invalid username or password"}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify({
        "access_token": access_token,
        "username": user.username
    }), 200

@app.route('/api/me', methods=['GET'])
@jwt_required()
def get_me():
    current_user = get_jwt_identity()
    return jsonify({"username": current_user}), 200

# --- IPO DATA ENDPOINTS ---
@app.route('/api/ipos')
def get_ipos():
    try:
        print("Fetching IPOs...")
        ipos = fetch_finnhub_ipos()
        # ipos is a dict with 'upcoming' key
        upcoming = ipos.get("upcoming", [])
        print("Sending IPO data:", upcoming)
        return jsonify(upcoming)
    except Exception as e:
        print(f"Error in get_ipos: {str(e)}")
        return jsonify([])

@app.route('/api/ipo/<name>')
def get_ipo(name):
    ipos = fetch_finnhub_ipos()
    ipo_list = ipos.get("listed", []) + ipos.get("upcoming", [])
    ipo = next((ipo for ipo in ipo_list if ipo['IPO_Name'].lower() == name.lower()), None)
    if not ipo:
        return jsonify({'error': 'IPO not found'}), 404
    return jsonify(ipo), 200

@app.route('/api/profitloss', methods=['POST'])
@jwt_required()
def profit_loss():
    data = request.json
    if not all(x in data for x in ['ipo_name', 'qty', 'sell_price']):
        return jsonify({'error': 'Missing fields'}), 400
    ipos = fetch_finnhub_ipos()
    ipo_list = ipos.get("listed", []) + ipos.get("upcoming", [])
    ipo = next((ipo for ipo in ipo_list if ipo['IPO_Name'].lower() == data['ipo_name'].lower()), None)
    if not ipo:
        return jsonify({'error': 'IPO not found'}), 404
    try:
        qty = int(data['qty'])
        sell_price = float(data['sell_price'])
        cost_price = float(ipo['Issue_Price'])
        pl = (sell_price - cost_price) * qty
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    return jsonify({'profit_loss': pl}), 200

# --- ML PREDICTION ENDPOINT ---
@app.route('/api/ml_predict', methods=['POST'])
@jwt_required()
def ml_predict():
    data = request.json
    # Expects: Issue_Size(crores), QIB, HNI, RII, Issue_price
    try:
        features = [
            float(data['Issue_Size(crores)']),
            float(data['QIB']),
            float(data['HNI']),
            float(data['RII']),
            float(data['Issue_price']),
        ]
        pred = predict_listing_gain(features)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    return jsonify({'predicted_listing_gain_percent': round(pred, 2)}), 200

# --- NLP SENTIMENT ENDPOINT ---
@app.route('/api/ipo_sentiment', methods=['POST'])
@jwt_required()
def ipo_sentiment():
    data = request.json
    ipo_name = data.get('ipo_name')
    if not ipo_name:
        return jsonify({'error': 'Missing ipo_name'}), 400
    sentiment = get_ipo_sentiment(ipo_name)
    return jsonify(sentiment), 200

# --- GRAPHS DATA ENDPOINT ---
@app.route('/api/ipo_trends')
def ipo_trends():
    ipos = fetch_finnhub_ipos()
    ipo_list = ipos.get("listed", []) + ipos.get("upcoming", [])
    chart_data = {
        'labels': [ipo['IPO_Name'] for ipo in ipo_list],
        'datasets': [
            {
                'label': 'Subscription (QIB)',
                'data': [ipo.get('QIB', 0) for ipo in ipo_list],
                'backgroundColor': 'rgba(54, 162, 235, 0.6)'
            },
            {
                'label': 'Listing Gain (%)',
                'data': [ipo.get('Listing_Gains(%)', 0) for ipo in ipo_list],
                'backgroundColor': 'rgba(255, 206, 86, 0.6)'
            },
        ]
    }
    return jsonify(chart_data), 200

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

# --- STATIC FILE SERVING ---
@app.route('/static/<path:filename>')
def serve_static(filename):
    build_dir = os.path.join(os.path.dirname(__file__), 'build')
    return send_from_directory(os.path.join(build_dir, 'static'), filename)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    build_dir = os.path.join(os.path.dirname(__file__), 'build')
    file_path = os.path.join(build_dir, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(build_dir, path)
    else:
        return send_from_directory(build_dir, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
