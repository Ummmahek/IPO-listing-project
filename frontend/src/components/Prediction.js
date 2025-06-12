import React, { useState, useEffect } from "react";
import { fetchMLPrediction } from "../api";

export default function Prediction({ selectedIPO }) {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPrediction = async () => {
            if (!selectedIPO) return;
            
            setLoading(true);
            setError(null);
            try {
                const data = await fetchMLPrediction({
                    'Issue_Size(crores)': selectedIPO['Issue_Size(crores)'] || 0,
                    'QIB': selectedIPO.QIB || 0,
                    'HNI': selectedIPO.HNI || 0,
                    'RII': selectedIPO.RII || 0,
                    'Issue_price': selectedIPO.Issue_Price || 0
                });
                setPrediction(data);
            } catch (err) {
                console.error("Error fetching prediction:", err);
                setError("Failed to get prediction. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        getPrediction();
    }, [selectedIPO]);

    if (!selectedIPO) return null;

    return (
        <div>
            <h3 style={{
                color: "#2c3e50",
                marginBottom: "20px",
                fontSize: "1.5rem",
                fontFamily: "'Poppins', sans-serif"
            }}>
                ML Prediction
            </h3>

            {loading && (
                <div style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#666",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px"
                }}>
                    Calculating prediction...
                </div>
            )}

            {error && (
                <div style={{
                    padding: "15px",
                    backgroundColor: "#fde8e8",
                    color: "#e74c3c",
                    borderRadius: "5px",
                    marginBottom: "15px"
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && prediction && (
                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "8px"
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "15px"
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            padding: "15px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                        }}>
                            <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>
                                Predicted Listing Gain
                            </div>
                            <div style={{
                                color: prediction.predicted_listing_gain_percent >= 0 ? "#27ae60" : "#e74c3c",
                                fontWeight: "500",
                                fontSize: "1.1rem"
                            }}>
                                {prediction.predicted_listing_gain_percent}%
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}