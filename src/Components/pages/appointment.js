import React from 'react'
import axios from 'axios'

export default class Form extends React.Component {
  state={
    price : 0,
    updating: false,
    Appid: "",
    outfitChanges : "",
    loc: "",
    photoType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }

  // This generates an appointment id for the customer
  generateKey = length => {
    let appId = ""
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789"
    for(let i = 0; i < length; i++){
        appId += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return appId;
};

  // used to update the state of the form elements
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updatePrice = () => {
    let est = this.state.price
    let changes = this.state.outfitChanges
    if(this.state.loc == "Studio")
      est = 100; 
    else 
      est = 200;
    try {
      est += parseInt(est,10) * 40 
    }
    catch{console.log("shit")}
    this.setState({price: est})
    
  }

  on

  onRetrieve = () => {
    console.log(this.state.Appid);
    axios
        .get(`http://localhost:5000/api/items/${this.state.Appid}`)
        .then(res => {
          console.log(res.data);
          this.setState({
            outfitChanges : res.data.outfit_changes,
            loc: res.data.location,
            photoType: res.data.photoshoot_type,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email_name,
            phone: res.data.phone_number,
            updating: true
          });
        });

  }
a
  onSubmit = () => {
    
    
    let data = {
      first_name : this.state.firstName,
      last_name : this.state.lastName,
      email_name : this.state.email,
      phone_number: this.state.phone,
      outfit_changes: this.state.outfitChanges,
      photoshoot_type: this.state.photoType,
      location: this.state.loc,
      appointment_id: this.state.updating ? this.state.Appid : this.generateKey(6) //if updating, use default appid. otherwise, make one
    }

    if(this.state.updating === true){
      axios
        .put(`http://localhost:5000/api/items/${this.state.Appid}`, data);
    }
    else{
    
    // stores the form data in the database
      axios
      .post(`http://localhost:5000/api/items`, data)
      .then(res => { console.log(res); console.log(res.data)})
      .catch(err => console.log(err));

    // passes the form data to the email system to send an email
     axios
     .post(`http://localhost:5000/email`, data)
       .then(res => { console.log(res); console.log(res.data)})
        .catch(err => {console.log(err)}); 
    }
  

    this.setState({
      updating : false,
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
          <label>appointment Id:
                <input name="Appid"
                value={this.state.Appid}
                onChange={e => this.change(e)}/> 
                </label>
              </form>
              <button onClick={() => this.onRetrieve()}>retrieve</button>
              <form style={linkstyle}>
            <p>Where would you like pictures taken?</p>
            <input type="radio" name="loc" value="Studio"  onChange={e => this.change(e)}/> In-studio <br/>
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
            <p/> <bt/>
            <label>Price: {this.state.price}</label> 
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

