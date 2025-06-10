import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider, { UserContext } from "./UserContext";
import { setAuthToken } from "./api";  // ✅ Import this
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navigation from "./components/Navigation";
import IPOSelector from "./components/IPOSelector";
import IPOInfo from "./components/IPOInfo";
import ProfitLossCalc from "./components/ProfitLossCalc";
import Prediction from "./components/Prediction";
import Sentiment from "./components/Sentiment";
import Graphs from "./components/Graphs";
import About from "./components/About";
import Forum from "./components/Forum";

function MainApp() {
  const [selectedIPO, setSelectedIPO] = useState(null);
  const { user, logout } = useContext(UserContext);

  return (
    <Router>
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh"
      }}>
        <Navigation />
        
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/" element={
            <>
              <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                marginBottom: "20px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px"
                }}>
                  <h1 style={{
                    margin: 0,
                    color: "#2c3e50",
                    fontSize: "2.5rem",
                    fontWeight: "600"
                  }}>IPO Listing Analysis</h1>
                  {user && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}>
                      <span style={{
                        color: "#666",
                        fontSize: "1.1rem"
                      }}>
                        Welcome, <b style={{ color: "#2c3e50" }}>{user.username}</b>
                      </span>
                      <button 
                        onClick={logout}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#e74c3c",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                          fontSize: "0.9rem"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px"
                }}>
                  <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}>
                    <IPOSelector onSelectIPO={setSelectedIPO} />
                  </div>
                  
                  {selectedIPO && (
                    <div style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <IPOInfo ipo={selectedIPO} />
                    </div>
                  )}
                </div>

                {selectedIPO && (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                    marginTop: "20px"
                  }}>
                    <div style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <ProfitLossCalc selectedIPO={selectedIPO} />
                    </div>
                    <div style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <Prediction selectedIPO={selectedIPO} />
                    </div>
                    <div style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <Sentiment selectedIPO={selectedIPO} />
                    </div>
                  </div>
                )}

                <div style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  marginTop: "20px"
                }}>
                  <Graphs />
                </div>
              </div>

              <footer style={{
                textAlign: "center",
                marginTop: "30px",
                color: "#666",
                padding: "20px",
                borderTop: "1px solid #eee"
              }}>
                © 2025 IPO Dashboard | All rights reserved
              </footer>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  // ✅ Restore token from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ user }) =>
          user ? (
            <MainApp />
          ) : showLogin ? (
            <Login onSwitch={() => setShowLogin(false)} />
          ) : (
            <Signup onSwitch={() => setShowLogin(true)} />
          )
        }
      </UserContext.Consumer>
    </UserProvider>
  );
}
