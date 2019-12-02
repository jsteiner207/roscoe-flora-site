import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //this is the router which allows us to have multiple pages in the single-page react website
import "./App.css";
import About from "./Components/pages/About";
import Home from "./Components/pages/Home";
import Header from "./Components/Header";
// import Portfolio from "./Components/pages/Portfolio";
import Uploader from "./Components/pages/uploader";

// import Appointment from "./Components/pages/appointment";
import Contact from "./Components/pages/Contact";
import Adminlogin from "./Components/pages/adminlogin";
import Dashboard from "./Components/pages/Dashboard";
import UserForm from "./Components/pages/UserForm";
import Portfolio from "./Components/pages/Portfolio";
import Service from "./Components/Services";
import SocialMedia from "./Components/SocialMedia.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <Header />
                <Home />
                <div><SocialMedia/></div>
                
              </React.Fragment>
            )}
          />
           <Route
            exact
            path="/Services"
            render={props => (
              <React.Fragment>
                <Header />
                <Service />
                <SocialMedia/>
              </React.Fragment>
            )}
          />
          <Route
            path="/about"
            render={props => (
              <React.Fragment>
                <Header />
                <About />
                <SocialMedia/>
              </React.Fragment>
            )}
          />
          <Route
            path="/portfolio"
            render={props => (
              <React.Fragment>
                <Header />
                <div className="container">
                  <Portfolio />
                </div>
                <hr class="between" />
                <hr class="between" />
                <div className="container" style={{ marginTop: '10' }}><SocialMedia/></div>
              </React.Fragment>
            )}
          />
          <Route
            path="/contact"
            render={props => (
              <React.Fragment>
                <Header />
                <Contact />
              </React.Fragment>
            )}
          />
          <Route
            path="/appointment"
            render={props => (
              <React.Fragment>
                <Header />
                {/* <Appointment/> */}
                <UserForm />
                <SocialMedia/>
              </React.Fragment>
            )}
          />
          <Route exact path="/admin" component={Adminlogin} />
          <Route path="/admin/dashboard" component={Dashboard} />
          {/* This is a test to see if this works */}
        </header>
      </div>
    </Router>
  );
}

export default App;
