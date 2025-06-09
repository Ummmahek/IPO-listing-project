import React, { useState, useContext } from "react";
import { login as apiLogin } from "../../api";
import { UserContext } from "../../UserContext";

export default function Login({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiLogin(username, password);
      login(res.access_token, res.username);
    } catch {
      setError("Invalid username or password");
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
        }}>Welcome Back</h2>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <input
              placeholder="Username"
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
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
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
            />
          </div>

          <button 
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
          >
            Login
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
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
