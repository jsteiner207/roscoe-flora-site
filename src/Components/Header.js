import React from 'react'
import {Link} from 'react-router-dom';
import './../App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';


function Header() {
    
    return (
        <div>
            <Container className="p-0" fluid={true}>

        <Navbar className="border-bottom" bg="transparent" expand="lg">
          <Navbar.Brand>Roscoe Flora</Navbar.Brand>

          <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
          <Navbar.Collapse id="navbar-toggle">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/portfolio">Portfolio</Link>
              <Link className="nav-link" to="/contact">Contact</Link>
              <Link className="nav-link" to="/Services">Services</Link>
              <Link className="nav-link" to="/appointment">Appointment</Link>

            </Nav>
          </Navbar.Collapse>


        </Navbar>
        </Container>

        </div>
        
    )}
    



    const linkstyle = {
        color: '#333',
        textDecoration: 'none'
    
    }

export default Header;
