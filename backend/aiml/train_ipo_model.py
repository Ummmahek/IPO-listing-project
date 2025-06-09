import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pickle

df = pd.read_csv("C:\\Users\\Mahek\\Desktop\\ipo-listing-project\\backend\\ipo_data.csv")  # Path relative to aiml/
features = ['Issue_Size(crores)', 'QIB', 'HNI', 'RII', 'Issue_price']
target = 'Listing_Gains(%)'
X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print("Model R^2 score on test:", model.score(X_test, y_test))

with open("ipo_listing_gain_model.pkl", "wb") as f:
    pickle.dump(model, f)