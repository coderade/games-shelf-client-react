import './App.css';
import React, {Component} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import Navbar from "./components/Navbar";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jwt: ""
        }
        this.handleSessionChange(this.handleSessionChange.bind(this))
    }

    handleSessionChange = (jwt) => {
        this.setState({jwt: jwt})
    }

    logout = () => {
        this.setState({jwt: ""})
    }

    render() {
        let isLogged = !!this.state.jwt;

        return (<Router>
            <div className={"container"}>
                <div className="row">
                    <div className="col mt-3">
                        <h1 className="mt-3">
                            Games Shelf
                        </h1>
                    </div>
                    <div className="col mt-3 text-end">
                        {isLogged ?
                            <Link to={"/logout"} onClick={this.logout}>Logout</Link> :
                            <Link to={"/login"}>Login</Link>
                        }
                    </div>
                    <hr className="mb-3"/>
                </div>
                <Navbar isLogged={isLogged} handleSessionChange={this.handleSessionChange}/>
            </div>
        </Router>);
    }
}
