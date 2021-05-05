import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import './Registration.css';
import RegistrationDataService from './RegistrationDataService';

class Registration extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            name: '',
            password: '',
            role: '',
            msg: null
        }

        this.registrationBtnClicked = this.registrationBtnClicked.bind(this);
    }

    registrationBtnClicked(event) {
        event.preventDefault();
        let user =
        {   phone:this.state.phone,
            name:this.state.name,
            password:this.state.password,
            role:this.state.role
        };

        RegistrationDataService.registerUser(user)
            .then(response => {
                this.setState({msg:'Registration successful. Please login!'})
                setTimeout(() => {
                    this.props.history.push('/login');
                }, 4000)
            })
            .catch(
                () => {this.setState({msg:'Something went wrong. Please try again'})}
            )
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        }, () => console.log(this.setState({msg: null})));
    };

    render() { 
        return ( 
            <div className = "registration">
                <Form autoComplete="off" onSubmit={this.registrationBtnClicked} >
                    {this.state.msg && <Form.Text className="" style={{color:"gray", fontWeight:"600"}}>
                        {this.state.msg}
                    </Form.Text>}
                    <Form.Label style={{fontSize:"25px", marginBottom:"15px"}}>Register</Form.Label>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control onChange={this.handleChange} name="phone" value={this.state.phone} type="text" placeholder="Enter phone" className = "registration-input" required />
                        <Form.Text className="text-muted">
                        We'll never share your phone number with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleChange} name="name" value={this.state.name} type="text" placeholder="Enter name" className = "registration-input" required />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="Enter password" className = "registration-input" required />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Label>Join as</Form.Label>
                        <Form.Control onChange={this.handleChange} name="role" value={this.state.role} as="select" className = "registration-input" required >
                            <option value="">-- select --</option>
                            <option>buyer</option>
                            <option>seller</option>
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