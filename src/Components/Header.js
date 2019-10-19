import React from 'react'
import {Link} from 'react-router-dom';
import './../App.css';


function Header() {
    
    return (
        
         <div className="Header-style-1">
            <h1 style={linkstyle}>Roscoe Flora</h1>
            <h3>
                <Link style={linkstyle} to="/">Home | </Link>
                <Link style={linkstyle} to="/about">About | </Link>
                <Link style={linkstyle} to="/portfolio">portfolio | </Link>
                <Link style={linkstyle} to="/contact">Contact | </Link>
                <Link style={linkstyle} to="/appointment">Appointment</Link>
            </h3>
        </div>
        
    )}
    



    const linkstyle = {
        color: '#333',
        textDecoration: 'none'
    
    }

export default Header;
