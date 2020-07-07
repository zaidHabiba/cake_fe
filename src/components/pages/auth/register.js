import React from 'react';
import Authenticate from "../../basic/auth/authenticate";
import {Button, Form, Header, Message, Segment} from 'semantic-ui-react';
import Email from "../../basic/base/Email";
import Password from "../../basic/base/Password";
import './login.css';
import request from "../../../api/base";
import {Link, Redirect} from "react-router-dom";
import Menu from "../../basic/menu";
import {ValidateEmail, ValidatePhone} from "../../basic/validators";

class Register extends React.Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: '',
        phone: '',
        error: false,
        loginSuccess: false,
        errorMsg: 'Some fields missing please try again'
    };

    handleRegister = async (e) => {
        if (!this.state.email) {
            this.setState({errorMsg: 'Enter email please', error: true});
            return 0;
        }
        if (!ValidateEmail(this.state.email)) {
            this.setState({errorMsg: 'Email not valid', error: true});
            return 0;
        }
        if (!this.state.password1 || !this.state.password2) {
            this.setState({errorMsg: 'Enter password please', error: true});
            return 0;
        }
        if (!this.state.phone) {
            this.setState({errorMsg: 'Enter phone please', error: true});
            return 0;
        }
        if (!ValidatePhone(this.state.phone)) {
            this.setState({errorMsg: 'Phone number not valid', error: true});
            return 0;
        }
        if (!this.state.firstName || !this.state.lastName) {
            this.setState({errorMsg: 'Enter name fields please', error: true});
            return 0;
        }
        if (this.state.password1 !== this.state.password2) {
            this.setState({errorMsg: 'Password not match!', error: true});
            return 0;
        }

        try {
            const response = await request.post('/register/', {
                password: this.state.password1,
                email: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                phone: this.state.phone
            });
            if (response.status === 201) {
                this.setState({loginSuccess: true});
            } else {
                this.setState({
                    error: true,
                    errorMsg: response.data.email ? response.data.email[0] : "There's fields missing please try again"
                });
            }
        } catch (e) {
            this.setState({error: true, errorMsg: "There's error please try again, email i already used."});
        }
    };

    render() {
        if (this.state.loginSuccess) {
            return <Redirect to='/login'/>
        }
        return (
            <Authenticate isUnauthenticated={true} ato='/'>
                <Menu/>
                <div className="login-container">
                    <Segment>
                        <Header size='large'>Register</Header>
                        <Form onSubmit={this.handleRegister}>
                            {this.renderErrorMsg()}
                            <Form.Field>
                                <label>Email</label>
                                <Email value={this.state.email} onChange={(e) => {
                                    this.setState({email: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First name' placeholder='First name'
                                            value={this.state.firstName} onChange={(e) => {
                                    this.setState({firstName: e.target.value})
                                }}/>
                                <Form.Input fluid label='Last name' placeholder='Last name' value={this.state.lastName}
                                            onChange={(e) => {
                                                this.setState({lastName: e.target.value})
                                            }}/>
                            </Form.Group>
                            <Form.Field>
                                <label>Password</label>
                                <Password value={this.state.password1} onChange={(e) => {
                                    this.setState({password1: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Enter Password Again</label>
                                <Password value={this.state.password2} onChange={(e) => {
                                    this.setState({password2: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Phone Number</label>
                                <input value={this.state.phone} onChange={(e) => {
                                    this.setState({phone: e.target.value})
                                }}/>
                            </Form.Field>
                            <Button color='teal'>Register</Button>
                            <Link to='/login'>I have account!</Link>
                        </Form>
                    </Segment>
                </div>
            </Authenticate>
        );

    }

    renderErrorMsg() {
        if (this.state.error) {
            return (
                <Message negative>
                    <Message.Header>{this.state.errorMsg}</Message.Header>
                </Message>
            )
        }
    }
}

export default Register;