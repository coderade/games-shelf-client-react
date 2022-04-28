import React, { Fragment, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom"
import Input from "../Form/Input";
import AuthService from "../../services/AuthService";
import FormAlert from "../Alert/Alert";


const Login = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState({show: false})
    const [errors, setErrors] = useState([])

    const showAlert = (status) => {
        setAlert({show: status})
    }

    const hasError = (key) => {
        return errors.includes(key)
    }

    const handleSessionChange = (token, signed) => {
        props.session.handleSessionChange(token, signed)
    }

    const validateForm = () => {
        let errors = [];
        if (!email) {
            errors.push('email')
        }
        if (!password) {
            errors.push('password')
        }

        setErrors(errors)

        if (!errors.length) {
            return true
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (validateForm()) {
            const data = new FormData(evt.target)
            const payload = Object.fromEntries(data.entries());

            AuthService.doLogin(payload).then(response => {
                handleSessionChange(response.token, true);
                navigate("/admin")
            })
            .catch(err => {
                const errorMessage = `Error during Login: ${err}`;
                setAlert({
                    variant: "danger", title: "Error!", message: errorMessage, show: true
                })
            })
        }
    }

    useEffect(() => {
        if (props.session.signed) {
            navigate("/admin")
        }
    })

    return (<Fragment>
        {alert.show ? <FormAlert variant={alert.variant}
                                 message={alert.message}
                                 title={alert.title}
                                 onClose={showAlert}/> : ""}
        <h2>Login </h2>
        <hr/>
        <form className="pt-3" method="post" onSubmit={handleSubmit}>
            <Input title="Email" type="email" name="email"
                   onChange={(evt) => setEmail(evt.target.value)} hasError={hasError}/>
            <Input title="Password" type="password" onChange={(evt) => setPassword(evt.target.value)}
                   name="password" hasError={hasError}/>
            <button className="btn btn-primary">Login</button>
        </form>
    </Fragment>);


}

export default Login;