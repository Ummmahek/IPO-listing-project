import React, { useState } from "react";
import { calcProfitLoss } from "../api";

export default function ProfitLossCalc({ selectedIPO }) {
    const [quantity, setQuantity] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCalculate = async (e) => {
        e.preventDefault();
        if (!selectedIPO || !quantity || !sellPrice) return;

        setLoading(true);
        setError(null);
        try {
            const data = await calcProfitLoss(selectedIPO.IPO_Name, quantity, sellPrice);
            setResult(data);
        } catch (err) {
            console.error("Error calculating profit/loss:", err);
            setError("Failed to calculate profit/loss. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!selectedIPO) return null;

    return (
        <div>
            <h3 style={{
                color: "#2c3e50",
                marginBottom: "20px",
                fontSize: "1.5rem",
                fontFamily: "'Poppins', sans-serif"
            }}>
                Profit/Loss Calculator
            </h3>

            <form onSubmit={handleCalculate} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#666"
                    }}>
                        Quantity
                    </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#666"
                    }}>
                        Sell Price
                    </label>
                    <input
                        type="number"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        placeholder="Enter sell price"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: loading ? "#95a5a6" : "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s"
                    }}
                    onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#2980b9")}
                    onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#3498db")}
                >
                    {loading ? "Calculating..." : "Calculate"}
                </button>
            </form>

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

            {!loading && !error && result && (
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
                                Profit/Loss
                            </div>
                            <div style={{
                                color: result.profit_loss >= 0 ? "#27ae60" : "#e74c3c",
                                fontWeight: "500",
                                fontSize: "1.1rem"
                            }}>
                                ₹{result.profit_loss.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}