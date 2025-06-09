import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Set auth token in headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Auth endpoints
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const signup = async (username, password) => {
  const response = await axios.post(`${API_URL}/signup`, { username, password });
  return response.data;
};

export const fetchMe = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

// IPO endpoints
export const fetchIPOs = async () => {
  try {
    const response = await axios.get(`${API_URL}/ipos`);
    const data = response.data;
    // Now data is an array of IPOs
    if (!Array.isArray(data)) {
      console.error("Invalid IPOs data:", data);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching IPOs:', error);
    return [];
  }
};

export const fetchIPOSentiment = async (ipoName) => {
  const response = await axios.post(`${API_URL}/ipo_sentiment`, { ipo_name: ipoName });
  return response.data;
};

export const fetchMLPrediction = async (ipoData) => {
  const response = await axios.post(`${API_URL}/ml_predict`, ipoData);
  return response.data;
};

// ---- IPO DATA ----
export async function fetchIPOByName(name) {
  const res = await axios.get(`${API_URL}/ipo/${encodeURIComponent(name)}`);
  return res.data;
}

// ---- PROFIT/LOSS ----
export async function calcProfitLoss(ipo_name, qty, sell_price) {
  const res = await axios.post(`${API_URL}/profitloss`, {
    ipo_name,
    qty,
    sell_price,
  });
  return res.data;
}

// ---- TRENDS ----
export async function fetchIPOTrends() {
  const res = await axios.get(`${API_URL}/ipo_trends`);
  return res.data;
}
