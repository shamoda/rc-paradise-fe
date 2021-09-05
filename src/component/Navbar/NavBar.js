import React, { Component, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router'

import './NavBar.css';
import logo from '../../asset/logo.PNG'
import Authentication from '../../authentication/Authentication'
<script src="https://kit.fontawesome.com/8f599a10dc.js" crossorigin="anonymous"></script>
class NavBar extends Component {
    render() {
        const isUserLoggedIn = Authentication.isUserLoggedIn();
        const loggedUserRole = Authentication.loggedUserRole();

        let loggedAsSeller = false;
        let loggedAsBuyer = false;

        if (loggedUserRole != null && loggedUserRole === 'seller') {
            loggedAsSeller = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'buyer') {
            loggedAsBuyer = true;
        }
        return (
            <div>
                <Navbar className="navbg" expand="lg">
                    <Link className="name" to="/" ><img src={logo} width="100" height="100" alt="logo" /> RC Paradise</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {loggedAsBuyer && <Link className="nav-link" to="/Cart">
                                <i class="fa" style={{ "fontSize": "24px" }} >&#xf07a;</i>
                                <span class='badge badge-warning' id='lblCartCount'>{JSON.parse(localStorage.getItem('cart')).length}</span>
                            </Link>}
                            {loggedAsSeller && <Link className="nav-link" to="/myparadise">My Paradise</Link>}
                            {loggedAsSeller && <Link className="nav-link" to="/orders">Orders</Link>}
                            <Link className="nav-link" to="/">Home</Link>
                            {isUserLoggedIn && <Link className="nav-link" onClick={() => Authentication.logout()} to="/login">Logout</Link>}
                            {!isUserLoggedIn && <Link className="nav-link" to="/login">Login</Link>}
                            {!isUserLoggedIn && <Link className="nav-link" to="/register">Register</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        );
    }
}

export default withRouter(NavBar);
