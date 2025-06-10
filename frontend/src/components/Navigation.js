import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '1rem',
            marginBottom: '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                    gap: '2rem'
                }}>
                    <Link to="/" style={{
                        color: 'white',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        backgroundColor: isActive('/') ? '#3498db' : 'transparent',
                        transition: 'background-color 0.2s'
                    }}>
                        IPO Listing
                    </Link>
                    
                    <Link to="/about" style={{
                        color: 'white',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        backgroundColor: isActive('/about') ? '#3498db' : 'transparent',
                        transition: 'background-color 0.2s'
                    }}>
                        About
                    </Link>
                    
                    <Link to="/forum" style={{
                        color: 'white',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        backgroundColor: isActive('/forum') ? '#3498db' : 'transparent',
                        transition: 'background-color 0.2s'
                    }}>
                        Discussion Forum
                    </Link>
                </div>
            </div>
        </nav>
    );
} 