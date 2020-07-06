import {Link} from "react-router-dom";
import Authenticate from "./auth/authenticate";
import React from "react";

class Menu extends React.Component {
    render() {
        return (<div className="wave">
            <div className="px-menu">
                <div className="menu-left">
                    <div className="menu-item">
                        <Link to=''>Home</Link>
                    </div>
                    <div className="menu-item">
                        <Link to=''>Offers</Link>
                    </div>
                    <Authenticate>
                        <div className="menu-item"><Link to='/add-item'>Add item</Link></div>
                        <div className="menu-item"><Link to='/view-items'>View items</Link></div>
                    </Authenticate>
                </div>
                <div className="menu-right">
                    <Authenticate>
                        <div className="menu-item"><Link to='/logout'>Logout</Link></div>
                    </Authenticate>
                    <Authenticate isUnauthenticated={true}>
                        <div className="menu-item"><Link to='/login'>Login</Link></div>
                    </Authenticate>
                </div>
            </div>
        </div>);
    }
}

export default Menu;