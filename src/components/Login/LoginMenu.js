import {Link, useNavigate} from "react-router-dom";
import React, {Component} from "react";
import Cookies from 'universal-cookie';
import {AuthContext} from "../../contexts/AuthContext";
const cookies = new Cookies();

class LoginMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: props.session
        }
    }

    render() {
        return (<AuthContext.Consumer>
            {session => <div className="col mt-3 text-end">
                {session.signed ? <Link to={"/logout"} onClick={this.logout}>Logout</Link> :
                    <Link to={"/login"}>Login</Link>}
            </div>}
        </AuthContext.Consumer>);
    }

    logout = (evt) => {
        evt.preventDefault()
        this.handleSessionChange("", false)
        cookies.remove('token', {path: '/'});
        this.props.navigate("/");
    }

    handleSessionChange = (token, signed) => {
        this.props.session.handleSessionChange(token, signed)
    }

}

function withNavigate(Component) {
    function ComponentWithNavigate(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate}/>
    }

    return ComponentWithNavigate
}

export default withNavigate(LoginMenu);
