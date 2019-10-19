import React from 'react'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default function adminlogin() {

    return (
        
        <div className="sign-in">
             <form className="" style={linkstyle}>
                <label>
                  Admin Username: <input type="text"/>
                </label>
            </form>
            <form className="form-signin" style={linkstyle}>
                <label>
                  Admin Password: <input type="text" />
                </label>
            </form>
            <button>ogin</button>
            </div>
       
    )
}


const linkstyle = {
    color: '#333',
    textDecoration: 'none',
}


