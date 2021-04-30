import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../asset/logo.PNG'

class NavBar extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar className="navbg" expand="lg"> 
                <Link className="name" to="/" ><img src={logo} width="100" height="100" alt="logo" /> RC Paradise</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Button variant="outline-light" className="button">Login</Button>
                    <Button variant="outline-light" className="button">Register</Button>
                </Nav>
                </Navbar.Collapse>
                </Navbar>

            </div>
         );
    }
}
 
export default NavBar;