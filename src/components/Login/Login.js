import React, {Component, Fragment} from "react";
import {Link, useLocation, useParams} from "react-router-dom"
import Input from "../Form/Input";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "", password: "", error: null, errors: [], alert: {
                show: false, initialGame: {}
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (<Fragment>
            <h2>Login </h2>
            <hr/>
            <form className="pt-3" onSubmit={this.handleSubmit}>
                <Input title="Email" type="email" name="email"
                       onChange={this.handleChange} hasError={this.hasError} />
                <Input title="Password" type="text" onChange={this.handleChange}
                       name="password" hasError={this.hasError}/>
            </form>
            <hr/>
            <button className="btn btn-primary">Login</button>
        </Fragment>);
    }

    componentDidMount() {

    }

    handleSubmit = (evt) => {
        evt.preventDefault()
    }

    hasError = (key) => {
        return this.state.errors.includes(key)
    }

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState(prevState => ({game: {...prevState.game, [name]: value}}))
    }

}

function

withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        const location = useLocation();
        return <Component {...props} params={params} location={location}/>
    }

    return ComponentWithRouter
}

export default withRouter(Login);