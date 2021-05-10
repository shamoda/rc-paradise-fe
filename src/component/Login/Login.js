import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import './Login.css';
import Authentication from '../../authentication/Authentication'
import AuthenticationDataService from '../../authentication/AuthenticationDataService'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            loginFailed: false
        }

        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked(event) {
        event.preventDefault();
        AuthenticationDataService.login(this.state.phone, this.state.password)
            .then(
                response => {
                    let basicAuthHeader = 'Basic ' + window.btoa(this.state.phone + ":" + this.state.password);
                    Authentication.successfulLogin(response.data, basicAuthHeader)
                    if (response.data.role === "seller") {
                        this.props.history.push('/myparadise');
                    } else {
                        this.props.history.push('/');
                    }

                }
            ).catch(
                () => { this.setState({ loginFailed: true }) }
            )
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => { this.setState({ loginFailed: false }) });
    };

    render() {
        return (
            <div className="login">
                <Form autoComplete="off" onSubmit={this.loginClicked} >
                    <Form.Label style={{ fontSize: "25px", marginBottom: "15px" }}>Login</Form.Label>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control onChange={this.handleChange} name="phone" value={this.state.phone} type="text" placeholder="Enter phone" className="login-input" required />
                        <Form.Text className="text-muted">
                            {/* We'll never share your phone number with anyone else. */}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="Enter password" className="login-input" required />
                    </Form.Group>
                    <Button variant="outline-light" type="submit" className="login-button">
                        Login
                    </Button>
                    {this.state.loginFailed && <Form.Text className="" style={{ color: "red", fontWeight: "600" }}>
                        Login failed. Please try again.
                    </Form.Text>}
                </Form>
            </div>
        );
    }
}

export default Login;