import React, { useState } from "react";
import { fetchMLPrediction } from "../api";

export default function Prediction({ selectedIPO }) {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePredict = async () => {
        if (!selectedIPO) return;
        
        setError("");
        setPrediction(null);
        setLoading(true);
        
        try {
            const features = {
                'Issue_Size(crores)': selectedIPO['Issue_Size(crores)'],
                'QIB': selectedIPO.QIB,
                'HNI': selectedIPO.HNI,
                'RII': selectedIPO.RII,
                'Issue_price': selectedIPO.Issue_Price
            };
            
            const res = await fetchMLPrediction(features);
            setPrediction(res.predicted_listing_gain_percent);
        } catch (e) {
            setError("Prediction failed.");
        }
        setLoading(false);
    };

    if (!selectedIPO) return null;

    return (
        <div style={{ marginBottom: 16 }}>
            <h3>ML: Listing Gain Prediction</h3>
            <button onClick={handlePredict} disabled={loading}>
                {loading ? "Predicting..." : "Predict Listing Gain"}
            </button>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            {prediction !== null && (
                <div style={{ marginTop: 8 }}>
                    <b>Predicted Listing Gain:</b> {prediction.toFixed(2)}%
                </div>
            )}
        </div>
    );
}