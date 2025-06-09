import React, { useState, useContext } from "react";
import { signup as apiSignup, login as apiLogin } from "../../api";
import { UserContext } from "../../UserContext";

export default function Signup({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      const signupResponse = await apiSignup(username, password);
      const loginResponse = await apiLogin(username, password);
      login(loginResponse.access_token, loginResponse.username);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{
          color: "#2c3e50",
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "2rem"
        }}>Create Account</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <input
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "1rem",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#ddd"}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#95a5a6" : "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#27ae60")}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#2ecc71")}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <div style={{
            color: "#e74c3c",
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#fde8e8",
            borderRadius: "5px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <div style={{
          marginTop: "20px",
          textAlign: "center"
        }}>
          <button 
            onClick={onSwitch}
            style={{
              background: "none",
              border: "none",
              color: "#3498db",
              cursor: "pointer",
              fontSize: "0.9rem",
              textDecoration: "underline"
            }}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
