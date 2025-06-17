import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path;
    };

    const linkStyle = (path) => ({
        color: isActive(path) ? '#3498db' : '#2c3e50',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        transition: 'background-color 0.2s',
        backgroundColor: isActive(path) ? '#f8f9fa' : 'transparent',
        fontWeight: isActive(path) ? '500' : 'normal'
    });

    return (
        <nav style={{
            backgroundColor: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: 1200,
                margin: '0 auto'
            }}>
                <div style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>
                    IPO Dashboard
                </div>
                
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={linkStyle('/')}>
                        Home
                    </Link>
                    <Link to="/watchlist" style={linkStyle('/watchlist')}>
                        Watchlist
                    </Link>
                    <Link to="/calculator" style={linkStyle('/calculator')}>
                        Investment Calculator
                    </Link>
                    <Link to="/forum" style={linkStyle('/forum')}>
                        Forum
                    </Link>
                    <Link to="/about" style={linkStyle('/about')}>
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
} 