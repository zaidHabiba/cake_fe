import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';
import Login from "../auth/login";
import Home from "../home/home";
import Logout from "../auth/logout";

class App extends React.Component {
    state = {
        user: undefined
    };

    constructor(props) {
        super(props);
        document.addEventListener('contextmenu', event => event.preventDefault());
    }

    render() {
        return (
            <BrowserRouter>
                <div className="page-wrapper">
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/logout" exact component={Logout}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
