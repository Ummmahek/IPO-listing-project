import React, { useState, useEffect } from "react";
import { fetchIPOSentiment } from "../api";

export default function Sentiment({ selectedIPO }) {
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedIPO) return;

        const fetchSentiment = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetchIPOSentiment(selectedIPO.IPO_Name);
                setSentiment(res);
            } catch (e) {
                setError("Sentiment analysis failed.");
            }
            setLoading(false);
        };

        fetchSentiment();
    }, [selectedIPO]);

    if (!selectedIPO) return null;
    if (loading) return <div>Loading sentiment analysis...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!sentiment) return null;

    return (
        <div>
            <h3>Sentiment Analysis</h3>
            <div>Overall Sentiment: {sentiment.overall_sentiment}</div>
            <div>Confidence: {sentiment.confidence}%</div>
            <div>Key Points:</div>
            <ul>
                {sentiment.key_points.map((point, i) => (
                    <li key={i}>{point}</li>
                ))}
            </ul>
        </div>
    );
}