import React, { createContext, useState, useEffect } from "react";
import { setAuthToken, fetchMe } from "./api";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchMe()
        .then(data => setUser({ username: data.username }))
        .catch(() => {
          localStorage.removeItem("token");
          setAuthToken(null);
          setUser(null);
        });
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
