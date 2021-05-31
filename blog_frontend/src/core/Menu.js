import React from 'react';
import {withRouter,Link} from 'react-router-dom';
import {signout,IsAuthenticated} from "../auth/helper/index";

const Menu = () =>{
    return(
        <div>
            <nav>
                <li><Link to="/">Home</Link></li>
                {!IsAuthenticated() && <div>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
                }
                <li><Link to="/post">explore</Link></li>
                <li><Link to="/category">Category</Link></li>
                {IsAuthenticated() &&
                <div>
                    <li><Link to="/create-post">Create-Post</Link></li>
                    <li><a href="/" onClick={()=>signout()}>Logout</a></li>
                    <li><a href="/profile" >Profile</a></li>
                </div>}
            </nav>
        </div>
    );
};

export default withRouter(Menu);