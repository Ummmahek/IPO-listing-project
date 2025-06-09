import pickle
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "ipo_listing_gain_model.pkl")

def predict_listing_gain(features):
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    X = np.array([features])
    return float(model.predict(X)[0])