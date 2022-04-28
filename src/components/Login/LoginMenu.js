import {Link, useNavigate} from "react-router-dom";
import React from "react";
import Cookies from 'universal-cookie';
import {AuthContext} from "../../contexts/AuthContext";

const LoginMenu = (props) => {
    const navigate = useNavigate();
    const session = props.session

    const logout = (evt) => {
        const cookies = new Cookies();
        evt.preventDefault()
        handleSessionChange("", false)
        cookies.remove('token', {path: '/'});
        navigate("/");
    }

    const handleSessionChange = (token, signed) => {
        session.handleSessionChange(token, signed)
    }

    return (<AuthContext.Consumer>
        {session => <div className="col mt-3 text-end">
            {session.signed ? <Link to={"/logout"} onClick={logout}>Logout</Link> : <Link to={"/login"}>Login</Link>}
        </div>}
    </AuthContext.Consumer>);


}

export default LoginMenu;
