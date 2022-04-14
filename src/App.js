import './App.css';
import React, {Component} from 'react'
import {HashRouter as Router} from 'react-router-dom'
import {AuthContext} from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Cookies from 'universal-cookie';
import LoginMenu from "./components/Login/LoginMenu";

const cookies = new Cookies();

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            session: {
                signed: false, token: ""
            }

        }
        this.handleSessionChange(this.handleSessionChange.bind(this))
    }

    handleSessionChange = (token, signed) => {
        this.setState({session: {token: token, signed: signed}})
    }

    componentDidMount() {
        this.checkSessionStatus();
    }

    checkSessionStatus = () => {
        const token = cookies.get('token');
        if (token) {
            this.setState({session: {signed: true, token: token}})
        }
    }

    render() {
        let {session} = this.state
        session.handleSessionChange = this.handleSessionChange
        return (<AuthContext.Provider value={session}>
            <Router>
                <div className={"container"}>
                    <div className="row">
                        <div className="col mt-3">
                            <h1 className="mt-3">
                                Games Shelf
                            </h1>
                        </div>
                        <LoginMenu session={session}/>
                        <hr className="mb-3"/>
                    </div>
                    <Navbar/>
                </div>
            </Router>
        </AuthContext.Provider>);
    }
}
