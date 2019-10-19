import React from 'react'



export default function () {
    return (
        <div>
          <form style={linkstyle}>
            <p>Where would you like pictures taken?</p>
            <input type="radio" name="loc" value="Studio"/> In-studio <br/>
            <input type="radio" name="loc" value="location"/> Location <br/>
            <p>What type of photoshoot are you interested in</p>
            <input type="radio" name="photo-type" value="Headshot"/> Headshot<br/>
            <input type="radio" name="photo-type" value="Portraiture"/> Portraiture<br/>
            <input type="radio" name="photo-type" value="fashion"/> Fashion<br/>
            <p>how many outfit changes would you need</p>
            <input list="numchanges" name="outfit changes"/>
            <datalist id="numchanges">
              <option value="0"/>
              <option value="1"/>
              <option value="2"/>
              <option value="3"/>
              <option value="4"/>  
            </datalist>
            <p/>
          </form>
            <form style={linkstyle}>
             
                <label>
                  First name: <input type="text" name="fname"s/>
                </label>
                <label>
                  Last name: <input type="text" name="fname"/>
                </label>
            </form>
            <form style={linkstyle}>
            <label>
                  email: <input type="text" name="fname"/>
                </label>
                <label>
                  Phone number: <input type="text" name="fname"/>
                </label><br/>
                <label>
                  Appointment Date: <input type="text" name="fname"/>
                </label>
                <label>
                  Appointment Time: <input type="text" name="fname"/>
                </label><br/>

            </form>

            <button>Submit
                </button>
            
            <h2 style={linkstyle}>Appointment is under construction</h2>
        </div>
    )
}

const linkstyle = {
    color: '#333',
    textDecoration: 'none'
}

