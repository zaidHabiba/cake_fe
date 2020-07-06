import React from "react";
import Cookies from "js-cookie";
import {Redirect} from "react-router-dom";

const Logout = () => {
    if (Cookies.get('token')) {
        Cookies.remove('token');
    }
    return <Redirect to='/'/>
};
export default Logout;