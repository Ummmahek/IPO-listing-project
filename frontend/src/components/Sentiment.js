import React, { useState, useEffect } from "react";
import { fetchIPOSentiment } from "../api";

export default function Sentiment({ selectedIPO }) {
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getSentiment = async () => {
            if (!selectedIPO) return;
            
            setLoading(true);
            setError(null);
            try {
                const data = await fetchIPOSentiment(selectedIPO.IPO_Name);
                console.log("Sentiment data received:", data);
                setSentiment(data);
                if (data.articles) {
                    setArticles(data.articles);
                }
            } catch (err) {
                console.error("Error fetching sentiment:", err);
                setError("Failed to fetch sentiment analysis. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        getSentiment();
    }, [selectedIPO]);

    if (!selectedIPO) return null;

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case "Positive":
                return "#27ae60";
            case "Negative":
                return "#e74c3c";
            default:
                return "#f39c12";
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h3 style={{
                color: "#2c3e50",
                marginBottom: "20px",
                fontSize: "1.5rem",
                fontFamily: "'Poppins', sans-serif"
            }}>
                Market Sentiment Analysis
            </h3>

            {loading && (
                <div style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#666",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px"
                }}>
                    Analyzing market sentiment...
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

            {!loading && !error && sentiment && (
                <>
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px"
                        }}>
                            <div style={{
                                backgroundColor: "white",
                                padding: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                flex: 1
                            }}>
                                <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>
                                    Overall Sentiment
                                </div>
                                <div style={{
                                    color: getSentimentColor(sentiment.sentiment),
                                    fontWeight: "500",
                                    fontSize: "1.1rem"
                                }}>
                                    {sentiment.sentiment}
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: "white",
                                padding: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                flex: 1
                            }}>
                                <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>
                                    Sentiment Score
                                </div>
                                <div style={{
                                    color: "#2c3e50",
                                    fontWeight: "500",
                                    fontSize: "1.1rem"
                                }}>
                                    {sentiment.score}
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: "white",
                                padding: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                flex: 1
                            }}>
                                <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>
                                    Articles Analyzed
                                </div>
                                <div style={{
                                    color: "#2c3e50",
                                    fontWeight: "500",
                                    fontSize: "1.1rem"
                                }}>
                                    {sentiment.articles_analyzed}
                                </div>
                            </div>
                        </div>
                    </div>

                    {articles && articles.length > 0 && (
                        <div style={{
                            backgroundColor: "#f8f9fa",
                            padding: "20px",
                            borderRadius: "8px"
                        }}>
                            <h4 style={{
                                color: "#2c3e50",
                                marginBottom: "15px",
                                fontSize: "1.2rem",
                                fontFamily: "'Poppins', sans-serif"
                            }}>
                                Recent News Articles
                            </h4>
                            <div style={{
                                display: "flex",
                                gap: "20px",
                                overflowX: "auto",
                                padding: "10px 0",
                                scrollbarWidth: "thin",
                                scrollbarColor: "#95a5a6 #f8f9fa"
                            }}>
                                {articles.map((article, index) => (
                                    <div key={index} style={{
                                        backgroundColor: "white",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                        minWidth: "300px",
                                        maxWidth: "400px",
                                        flex: "0 0 auto"
                                    }}>
                                        <div style={{
                                            color: "#2c3e50",
                                            fontWeight: "500",
                                            marginBottom: "10px",
                                            fontSize: "1rem"
                                        }}>
                                            {article.title}
                                        </div>
                                        <div style={{
                                            color: "#666",
                                            fontSize: "0.9rem",
                                            marginBottom: "10px"
                                        }}>
                                            {article.description}
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            fontSize: "0.8rem",
                                            color: "#95a5a6"
                                        }}>
                                            <span>{article.source}</span>
                                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {sentiment.error && (
                        <div style={{
                            marginTop: "15px",
                            padding: "10px",
                            backgroundColor: "#fff3cd",
                            color: "#856404",
                            borderRadius: "5px",
                            fontSize: "0.9rem"
                        }}>
                            Note: {sentiment.error}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}