import React from "react";

export default function IPOInfo({ ipo }) {
    if (!ipo) return null;
    
    const formatValue = (value) => {
        if (value === "N/A") return "N/A";
        if (typeof value === "number") return value.toLocaleString();
        return value;
    };

    const formatCurrency = (value) => {
        if (value === "N/A") return "N/A";
        if (typeof value === "string" && value.includes("$")) return value;
        return `$${formatValue(value)}`;
    };

    const formatPercentage = (value) => {
        if (value === "N/A") return "N/A";
        return `${formatValue(value)}%`;
    };

    return (
        <div style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <h2 style={{
                color: "#2c3e50",
                marginBottom: "20px",
                fontSize: "1.8rem",
                borderBottom: "2px solid #eee",
                paddingBottom: "10px"
            }}>
                {ipo.IPO_Name}
            </h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px"
            }}>
                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Symbol</div>
                    <div style={{ color: "#2c3e50", fontWeight: "500" }}>{ipo.Symbol || "N/A"}</div>
                </div>

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Status</div>
                    <div style={{ 
                        color: "#2c3e50", 
                        fontWeight: "500",
                        color: ipo.Status === "Upcoming" ? "#e67e22" : "#27ae60"
                    }}>
                        {ipo.Status}
                    </div>
                </div>

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Listing Date</div>
                    <div style={{ color: "#2c3e50", fontWeight: "500" }}>{ipo.Date}</div>
                </div>

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Exchange</div>
                    <div style={{ color: "#2c3e50", fontWeight: "500" }}>{ipo.Exchange}</div>
                </div>

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Issue Price Range</div>
                    <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatCurrency(ipo.Issue_Price)}</div>
                </div>

                {ipo.Average_Price !== "N/A" && (
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px"
                    }}>
                        <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Average Price</div>
                        <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatCurrency(ipo.Average_Price)}</div>
                    </div>
                )}

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Issue Size</div>
                    <div style={{ color: "#2c3e50", fontWeight: "500" }}>₹{formatValue(ipo['Issue_Size(crores)'])} Cr</div>
                </div>

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Market Lot</div>
                    <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatValue(ipo.Market_Lot)}</div>
                </div>

                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px",
                    gridColumn: "1 / -1"
                }}>
                    <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "10px" }}>Subscription Details</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "15px"
                    }}>
                        <div>
                            <div style={{ color: "#666", fontSize: "0.8rem" }}>QIB</div>
                            <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatValue(ipo.QIB)}x</div>
                        </div>
                        <div>
                            <div style={{ color: "#666", fontSize: "0.8rem" }}>HNI</div>
                            <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatValue(ipo.HNI)}x</div>
                        </div>
                        <div>
                            <div style={{ color: "#666", fontSize: "0.8rem" }}>RII</div>
                            <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatValue(ipo.RII)}x</div>
                        </div>
                    </div>
                </div>

                {ipo['Listing_Gains(%)'] !== "N/A" && (
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px"
                    }}>
                        <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Listing Gains</div>
                        <div style={{ 
                            color: parseFloat(ipo['Listing_Gains(%)']) >= 0 ? "#27ae60" : "#e74c3c",
                            fontWeight: "500"
                        }}>
                            {formatPercentage(ipo['Listing_Gains(%)'])}
                        </div>
                    </div>
                )}

                {ipo.CMP !== "N/A" && (
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px"
                    }}>
                        <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Current Market Price</div>
                        <div style={{ color: "#2c3e50", fontWeight: "500" }}>{formatCurrency(ipo.CMP)}</div>
                    </div>
                )}

                {ipo['Current_gains'] !== "N/A" && (
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px"
                    }}>
                        <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "5px" }}>Current Gains</div>
                        <div style={{ 
                            color: parseFloat(ipo['Current_gains']) >= 0 ? "#27ae60" : "#e74c3c",
                            fontWeight: "500"
                        }}>
                            {formatPercentage(ipo['Current_gains'])}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
