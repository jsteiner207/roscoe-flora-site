import React from 'react'
import axios from 'axios'

export default class Form extends React.Component {
  state={
    outfitChanges : "",
    loc: "",
    photoType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }

  // used to update the state of the form elements
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    let data = {
      first_name : this.state.firstName,
      last_name : this.state.lastName,
      email_name : this.state.email,
      phone_number: this.state.phone,
      outfit_changes: this.state.outfitChanges,
      photoshoot_type: this.state.photoType,
      location: this.state.loc
    }

    axios
      .post(`http://localhost:5000/api/items`, data)
      .then(res => { console.log(res); console.log(res.data)})
      .catch(err => console.log(err));
  
    console.log(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    })
  }

  render() {
    return (
       <div>
          <form style={linkstyle}>
            <p>Where would you like pictures taken?</p>
            <input type="radio" name="loc" value="Studio" onChange={e => this.change(e)}/> In-studio <br/>
            <input type="radio" name="loc" value="location" onChange={e => this.change(e)}/> Location <br/>
            <p>What type of photoshoot are you interested in</p>
            <input type="radio" name="photoType" value="Headshot" onChange={e => this.change(e)}/> Headshot<br/>
            <input type="radio" name="photoType" value="Portraiture" onChange={e => this.change(e)}/> Portraiture<br/>
            <input type="radio" name="photoType" value="fashion" onChange={e => this.change(e)}/> Fashion<br/>
            <p>how many outfit changes would you need</p>
            <input list="numchanges" name="outfitChanges" onChange={e => this.change(e)}/>
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
             
                <label> First name: 
                  <input
                    name="firstName"
                    placeholder="first name"       
                    value={this.state.firstName}
                    onChange={e => this.change(e)}
                  />
                </label>
                <label>Last name: 
                  <input
                    name="lastName"
                    placeholder="last name"       
                    value={this.state.lastName}
                    onChange={e => this.change(e)}
                  />
                </label>
            </form>
            <form style={linkstyle}>
            <label> email: 
              <input 
                name="email"
                placeholder="email"       
                value={this.state.email}
                onChange={e => this.change(e)}
              />
            </label>
            <label>  Phone number: 
              <input
                name="phone"
                placeholder="phone-number"       
                value={this.state.phone}
                onChange={e => this.change(e)}
              />
                </label><br/>
                <label>
                  Appointment Date: <input type="text" name="fname"/>
                </label>
                <label>
                  Appointment Time: <input type="text" name="fname"/>
                </label><br/>
            </form>

            <button onClick={() => this.onSubmit()}>Submit
                </button>
            
            <h2 style={linkstyle}>Appointment is under construction</h2>
        </div>
    )
  }

}




        
    

const linkstyle = {
    color: '#333',
    textDecoration: 'none'
}

