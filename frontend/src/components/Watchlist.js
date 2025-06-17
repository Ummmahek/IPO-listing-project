import React, { useState, useEffect } from 'react';
import { fetchIPOs } from '../api';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [selectedIPO, setSelectedIPO] = useState('');
  const [priceThreshold, setPriceThreshold] = useState('');
  const [notificationType, setNotificationType] = useState('email');

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('ipoWatchlist');
    const savedAlerts = localStorage.getItem('ipoAlerts');
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ipoWatchlist', JSON.stringify(watchlist));
    localStorage.setItem('ipoAlerts', JSON.stringify(alerts));
  }, [watchlist, alerts]);

  const addToWatchlist = (ipo) => {
    if (!watchlist.find(item => item.IPO_Name === ipo.IPO_Name)) {
      setWatchlist([...watchlist, ipo]);
    }
  };

  const removeFromWatchlist = (ipoName) => {
    setWatchlist(watchlist.filter(item => item.IPO_Name !== ipoName));
    // Also remove any alerts for this IPO
    setAlerts(alerts.filter(alert => alert.ipoName !== ipoName));
  };

  const addAlert = () => {
    if (selectedIPO && priceThreshold) {
      const newAlert = {
        ipoName: selectedIPO,
        threshold: parseFloat(priceThreshold),
        type: notificationType,
        createdAt: new Date().toISOString()
      };
      setAlerts([...alerts, newAlert]);
      setShowAddAlert(false);
      setSelectedIPO('');
      setPriceThreshold('');
    }
  };

  const removeAlert = (index) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontFamily: "'Poppins', sans-serif"
      }}>
        My IPO Watchlist
      </h2>

      {/* Watchlist Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#34495e', marginBottom: '15px' }}>Saved IPOs</h3>
        {watchlist.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>No IPOs in your watchlist yet</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px'
          }}>
            {watchlist.map((ipo) => (
              <div key={ipo.IPO_Name} style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ margin: 0, color: '#2c3e50' }}>{ipo.IPO_Name}</h4>
                  <button
                    onClick={() => removeFromWatchlist(ipo.IPO_Name)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  <p>Date: {ipo.Date}</p>
                  <p>Price: {ipo.Issue_Price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerts Section */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ color: '#34495e', margin: 0 }}>Price Alerts</h3>
          <button
            onClick={() => setShowAddAlert(true)}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add Alert
          </button>
        </div>

        {showAddAlert && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>Set New Alert</h4>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>IPO Name</label>
              <input
                type="text"
                value={selectedIPO}
                onChange={(e) => setSelectedIPO(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Price Threshold</label>
              <input
                type="number"
                value={priceThreshold}
                onChange={(e) => setPriceThreshold(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Notification Type</label>
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={addAlert}
                style={{
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save Alert
              </button>
              <button
                onClick={() => setShowAddAlert(false)}
                style={{
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {alerts.length === 0 ? (
          <p style={{ color: '#7f8c8d' }}>No alerts set</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px'
          }}>
            {alerts.map((alert, index) => (
              <div key={index} style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ margin: 0, color: '#2c3e50' }}>{alert.ipoName}</h4>
                  <button
                    onClick={() => removeAlert(index)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  <p>Threshold: ₹{alert.threshold}</p>
                  <p>Notification: {alert.type}</p>
                  <p>Created: {new Date(alert.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 