import React, {Component, Fragment} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom"
import Input from "../Form/Input";
import AuthService from "../../services/AuthService";
import FormAlert from "../Alert/Alert";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "", password: "", error: null, errors: [], alert: {
                show: false, initialGame: {}
            }, token: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    showAlert = (status) => {
        this.setState({alert: {show: status}})
    }

    render() {
        const {alert} = this.state
        return (<Fragment>
            {alert.show ? <FormAlert variant={alert.variant}
                                     message={alert.message}
                                     title={alert.title}
                                     onClose={this.showAlert}/> : ""}
            <h2>Login </h2>
            <hr/>
            <form className="pt-3" method="post" onSubmit={this.handleSubmit}>
                <Input title="Email" type="email" name="email"
                       onChange={this.handleChange} hasError={this.hasError}/>
                <Input title="Password" type="password" onChange={this.handleChange}
                       name="password" hasError={this.hasError}/>
                <button className="btn btn-primary">Login</button>
            </form>
        </Fragment>);
    }

    componentDidMount() {
    if (this.props.session.signed) {
            this.props.navigate("/admin")
        }
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        if (this.validateForm()) {
            const data = new FormData(evt.target)
            const payload = Object.fromEntries(data.entries());

            AuthService.doLogin(payload).then(response => {
                this.setState({
                    alert: {
                        variant: "success", title: "Success!", message: "Games saved successfully!", show: true
                    }, isLoaded: true, token: response.token
                })
                this.handleSessionChange(response.token, true);
                this.props.navigate("/admin")
            })
                .catch(err => {
                    const errorMessage = `Error during Login: ${err}`;
                    this.setState({
                        alert: {
                            variant: "danger", title: "Error!", message: errorMessage, show: true
                        }, isLoaded: true
                    })
                })
        }
    }

    hasError = (key) => {
        return this.state.errors.includes(key)
    }

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState(prevState => ({[name]: value}))
    }

    handleSessionChange = (token, signed) => {
        this.props.session.handleSessionChange(token, signed)
    }


    validateForm = () => {
        let errors = [];
        if (!this.state.email) {
            errors.push('email')
        }
        if (!this.state.password) {
            errors.push('password')
        }

        this.setState({errors: errors})

        if (!errors.length) {
            return true
        }
    }

}


function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        const navigate = useNavigate()
        const location = useLocation();
        return <Component {...props} params={params} location={location} navigate={navigate}/>
    }

    return ComponentWithRouter
}

export default withRouter(Login);