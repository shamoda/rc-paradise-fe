import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import './Login.css';

class Login extends Component {
    state = {  }

    render() { 
        return ( 
            <div className = "login">
                <Form autocomplete="off"  >
                <Form.Label style={{fontSize:"25px", marginBottom:"15px"}}>Login</Form.Label>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone" className = "login-input" />
                        <Form.Text className="text-muted">
                        {/* We'll never share your phone number with anyone else. */}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" className = "login-input" />
                    </Form.Group>
                    <Button variant="outline-light" type="submit" className = "login-button">
                        Login
                    </Button>
                </Form>
            </div>
         );
    }
}
 
export default Login;