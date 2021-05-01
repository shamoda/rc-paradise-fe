import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import './Registration.css';

class Registration extends Component {
    state = {  }

    render() { 
        return ( 
            <div className = "registration">
                <Form autocomplete="off"  >
                    <Form.Label style={{fontSize:"25px", marginBottom:"15px"}}>Register</Form.Label>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone" className = "registration-input" />
                        <Form.Text className="text-muted">
                        We'll never share your phone number with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" className = "registration-input" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" className = "registration-input" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Label>Join as</Form.Label>
                        <Form.Control as="select" className = "registration-input">
                            <option value="">-- Select --</option>
                            <option>Buyer</option>
                            <option>Seller</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="outline-light" type="submit" className = "registration-button">
                        Register
                    </Button>
                </Form>
            </div>
         );
    }
}
 
export default Registration;