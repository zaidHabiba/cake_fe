import React from 'react';
import Authenticate from "../../basic/auth/authenticate";
import {Button, Form, Header, Message, Segment} from 'semantic-ui-react';
import Email from "../../basic/base/Email";
import Password from "../../basic/base/Password";
import './login.css';
import request from "../../../api/base";
import Cookies from "js-cookie";
import {Redirect} from "react-router-dom";
import Menu from "../../basic/menu";

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: false,
        loginSuccess: false
    };

    handleLogin = async (e) => {
        if (this.state.password && this.state.username) {
            try {
                const response = await request.post('/user-auth/', {
                    password: this.state.password,
                    username: this.state.username
                });
                if (response.status === 200) {
                    Cookies.set('token', response.data.token);
                    this.setState({loginSuccess: true});
                } else {
                    this.setState({error: true, username: '', password: ''});
                }
            } catch (e) {
                this.setState({error: true, username: '', password: ''});
            }
        }
    };


    render() {
        if (this.state.loginSuccess) {
            return <Redirect to='/'/>
        }
        return (
            <Authenticate isUnauthenticated={true} ato='/'>
                <Menu/>
                <div className="login-container">
                    <Segment>
                        <Header size='large'>Login</Header>
                        <Form onSubmit={this.handleLogin}>
                            {this.renderErrorMsg()}
                            <Form.Field>
                                <label>User name</label>
                                <Email value={this.state.username} onChange={(e) => {
                                    this.setState({username: e.target.value})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Password value={this.state.password} onChange={(e) => {
                                    this.setState({password: e.target.value})
                                }}/>
                            </Form.Field>
                            <Button color='teal'>Login</Button>
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
                    <Message.Header>Email or password are not correct, Please try again!</Message.Header>
                </Message>
            )
        }
    }
}

export default Login;