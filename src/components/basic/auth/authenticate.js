import React from 'react';
import {Redirect} from "react-router-dom";
import Cookies from 'js-cookie';
import request from "../../../api/base";

class Authenticate extends React.Component {

    state = {
        isAuthenticate: false,
        isWaitingRequest: true,
        user: {}
    };
    fto;
    isUnauthenticated;

    componentDidMount = async () => {
        if (Cookies.get("token")) {
            const response = await request.get('/user/', {headers: {Authorization: `Token ${Cookies.get("token")}`}});
            if (response.status === 200) {
                this.setState({isAuthenticate: true, isWaitingRequest: false, user: response.data});
            } else {
                this.setState({isAuthenticate: false, isWaitingRequest: false});
            }
        } else {
            this.setState({isAuthenticate: false, isWaitingRequest: false});
        }
    };

    render() {
        if (this.state.isWaitingRequest) {
            if (this.state.isAuthenticate) {
                if (this.props.loading) {
                    return this.props.loading;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            if (this.state.isAuthenticate) {
                if (this.props.isUnauthenticated) {
                    if (this.props.ato) {
                        return <Redirect to={this.props.ato}/>;
                    }
                    return null;
                } else {
                    if (!this.props.adminOnly) {
                        return this.props.children;
                    } else {
                        if (this.state.user && this.state.user.is_superuser) {
                            return this.props.children;
                        } else {
                            return null;
                        }
                    }
                }
            } else if (this.props.fto) {
                return <Redirect to={this.props.fto}/>;
            } else if (this.props.isUnauthenticated) {
                return this.props.children;
            } else {
                return null;
            }
        }
    }


}

export default Authenticate;