import React from 'react'
import {Link} from 'react-router-dom';
import './../App.css';


function Header() {
    
    return (
        
         <div className="Header-style-1 text-center">
            <h1 style={linkstyle}>Roscoe Flora</h1>
            <h5>
                <Link style={linkstyle} to="/">Home | </Link>
                <Link style={linkstyle} to="/about">About | </Link>
                <Link style={linkstyle} to="/portfolio">Portfolio | </Link>
                <Link style={linkstyle} to="/contact">Contact | </Link>
                <Link style={linkstyle} to="/appointment">Appointment</Link>
            </h5>
        </div>
        
    )}
    



    const linkstyle = {
        color: '#333',
        textDecoration: 'none'
    
    }

export default Header;
