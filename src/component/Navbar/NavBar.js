import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCartPlus, faEdit, faEye, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                    <Link className="nav-link" to="/"><Button variant="outline-light" className="button"><FontAwesomeIcon icon={faCartArrowDown} /></Button></Link>
                    <Link className="nav-link" to="/myparadise"><Button variant="outline-light" className="button">My Paradise</Button></Link>
                    <Link className="nav-link" to="/"><Button variant="outline-light" className="button">Home</Button></Link>
                    <Link className="nav-link" to="/"><Button variant="outline-light" className="button">Logout</Button></Link>
                    <Link className="nav-link" to="/login"><Button variant="outline-light" className="button">Login</Button></Link>
                    <Link className="nav-link" to="/register"><Button variant="outline-light" className="button">Register</Button></Link>
                </Nav>
                </Navbar.Collapse>
                </Navbar>

            </div>
         );
    }
}
 
export default NavBar;