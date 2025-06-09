import React, { useState } from "react";
import { calcProfitLoss } from "../api";

export default function ProfitLossCalc({ selectedIPO }) {
    const [qty, setQty] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCalc = async () => {
        setError("");
        setResult(null);
        if (!qty || !sellPrice) {
            setError("Please enter both quantity and sell price.");
            return;
        }
        setLoading(true);
        try {
            const res = await calcProfitLoss(selectedIPO.IPO_Name, qty, sellPrice);
            setResult(res.profit_loss);
        } catch (e) {
            setError("Calculation failed.");
        }
        setLoading(false);
    };

    if (!selectedIPO) return null;

    return (
        <div style={{ marginBottom: 16 }}>
            <h3>Profit/Loss Calculator</h3>
            <label>
                Quantity:
                <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                    style={{ margin: "0 8px" }}
                />
            </label>
            <label>
                Sell Price:
                <input
                    type="number"
                    min="0"
                    value={sellPrice}
                    onChange={e => setSellPrice(e.target.value)}
                    style={{ margin: "0 8px" }}
                />
            </label>
            <button onClick={handleCalc} disabled={loading}>
                {loading ? "Calculating..." : "Calculate"}
            </button>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            {result !== null && (
                <div style={{ color: result >= 0 ? "green" : "red", marginTop: 8 }}>
                    {result >= 0 ? `Profit: ₹${result}` : `Loss: ₹${Math.abs(result)}`}
                </div>
            )}
        </div>
    );
}