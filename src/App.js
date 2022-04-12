import './App.css';
import React, {Component} from 'react'
import {HashRouter as Router, Link} from 'react-router-dom'
import Navbar from "./components/Navbar";
import {AuthContext} from "./contexts/AuthContext";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signed: false
        }
        this.handleSessionChange(this.handleSessionChange.bind(this))
    }

    handleSessionChange = (jwt) => {
        this.setState({jwt: jwt, signed: true})
    }

    logout = () => {
        this.setState({signed: false})
    }

    render() {
        let {signed} = this.state

        const session = {
            signed: signed, handleSessionChange: this.handleSessionChange
        }
        return (<AuthContext.Provider value={session}>
            <Router>
                <div className={"container"}>
                    <div className="row">
                        <div className="col mt-3">
                            <h1 className="mt-3">
                                Games Shelf
                            </h1>
                        </div>
                        <div className="col mt-3 text-end">
                            {signed ? <Link to={"/logout"} onClick={this.logout}>Logout</Link> :
                                <Link to={"/login"}>Login</Link>}
                        </div>
                        <hr className="mb-3"/>
                    </div>
                    <Navbar/>
                </div>
            </Router>
        </AuthContext.Provider>);
    }
}
