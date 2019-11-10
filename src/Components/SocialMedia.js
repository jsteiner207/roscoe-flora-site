import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{
    faInstagram,
    faFacebook
} from '@fortawesome/free-brands-svg-icons'

export default function SocialMedia() {
    return (
        <div style={linkstyle} className="social-container">
            <h2>Follow Us On Our Social Media</h2>
                <a href="https://www.instagram.com/roscoeflora/"
                className="twitter social">

                
                 <FontAwesomeIcon icon={faInstagram} size="2x"/>
                </a>

                <a href="https://www.facebook.com/roscoefloraphoto"
                className="facebook social">

                
                 <FontAwesomeIcon icon={faFacebook} size="2x"/>
                </a>
                
        </div>
    );
}
const linkstyle = {
    color: '#333',
    
    textDecoration: 'none'}

