import React, { useEffect, useState } from "react";
import { fetchIPOs } from "../api";

export default function IPOSelector({ onSelectIPO }) {
  const [ipos, setIPOs] = useState([]);
  const [selected, setSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadIPOs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIPOs();
        if (!mounted) return;
        setIPOs(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load IPOs. Please try again.");
        setIPOs([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadIPOs();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const ipoName = e.target.value;
    setSelected(ipoName);
    const selectedIPO = ipos.find((ipo) => ipo.IPO_Name === ipoName);
    onSelectIPO(selectedIPO || null);
  };

  if (loading) {
    return (
      <div style={{
        padding: "20px",
        textAlign: "center",
        color: "#666",
        fontSize: "1.1rem"
      }}>
        Loading IPOs...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: "20px",
        color: "#e74c3c",
        textAlign: "center",
        backgroundColor: "#fde8e8",
        borderRadius: "5px",
        fontSize: "1.1rem"
      }}>
        {error}
      </div>
    );
  }

  if (!Array.isArray(ipos) || ipos.length === 0) {
    return (
      <div style={{
        padding: "20px",
        textAlign: "center",
        color: "#666",
        fontSize: "1.1rem"
      }}>
        No IPOs found
      </div>
    );
  }

  let filtered = ipos.filter(
    (ipo) => ipo.IPO_Name && ipo.IPO_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sorted = [...filtered];
  if (sortOption === "name-asc") {
    sorted.sort((a, b) => a.IPO_Name.localeCompare(b.IPO_Name));
  } else if (sortOption === "name-desc") {
    sorted.sort((a, b) => b.IPO_Name.localeCompare(a.IPO_Name));
  } else if (sortOption === "price-asc") {
    sorted.sort((a, b) => {
      const aPrice = isNaN(parseFloat(a.Average_Price)) ? Infinity : parseFloat(a.Average_Price);
      const bPrice = isNaN(parseFloat(b.Average_Price)) ? Infinity : parseFloat(b.Average_Price);
      return aPrice - bPrice;
    });
  } else if (sortOption === "price-desc") {
    sorted.sort((a, b) => {
      const aPrice = isNaN(parseFloat(a.Average_Price)) ? -Infinity : parseFloat(a.Average_Price);
      const bPrice = isNaN(parseFloat(b.Average_Price)) ? -Infinity : parseFloat(b.Average_Price);
      return bPrice - aPrice;
    });
  } else if (sortOption === "date-asc") {
    sorted.sort((a, b) => new Date(a.Date) - new Date(b.Date));
  } else if (sortOption === "date-desc") {
    sorted.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontWeight: "bold",
        marginBottom: 16,
        fontSize: "1.2rem",
        color: "#2c3e50"
      }}>
        Upcoming IPOs
      </div>

      <div style={{
        position: "relative",
        marginBottom: 16
      }}>
        <input
          type="text"
          placeholder="Search IPO name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            paddingLeft: "35px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        />
        <span style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#95a5a6"
        }}>
          🔍
        </span>
      </div>

      <select
        value={selected}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          fontSize: "1rem",
          marginBottom: 16,
          backgroundColor: "white",
          cursor: "pointer",
          transition: "border-color 0.2s"
        }}
        onFocus={(e) => e.target.style.borderColor = "#3498db"}
        onBlur={(e) => e.target.style.borderColor = "#ddd"}
      >
        <option value="">--Choose an IPO--</option>
        {sorted.map((ipo) => (
          <option key={ipo.IPO_Name} value={ipo.IPO_Name}>
            {ipo.IPO_Name} {ipo.Symbol ? `(${ipo.Symbol})` : ""} - {ipo.Date}
          </option>
        ))}
      </select>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: 12
      }}>
        <label style={{
          color: "#2c3e50",
          fontWeight: "500"
        }}>
          Sort by:
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "0.9rem",
            backgroundColor: "white",
            cursor: "pointer",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ddd"}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="date-asc">Date (Earliest First)</option>
          <option value="date-desc">Date (Latest First)</option>
        </select>
      </div>
    </div>
  );
}