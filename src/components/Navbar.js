import {Link} from "react-router-dom";
import React, {Component} from "react";
import AppRoutes from "../routes/Routes";
import {Nav} from "react-bootstrap";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogged: props.isLogged}
    }

    handleSessionChange = (jwt) => {
        this.props.handleSessionChange(jwt)
    }

    render() {
        let {isLogged} = this.state
        return (<div className="row">
            <div className="col-md-2">
                <Nav defaultActiveKey="/" className="list-group" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-0" href="/" className="list-group-item">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-1" href="/games" className="list-group-item">Games</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-2" href="/genres" className="list-group-item">Genres</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-3" href="/platforms" className="list-group-item">Platforms</Nav.Link>
                    </Nav.Item>
                    {isLogged ? <Nav.Item as="li">
                        <Nav.Link eventKey="link-admin" href="/admin" className="list-group-item">Admin</Nav.Link>
                    </Nav.Item> : ""}
                </Nav>
            </div>
            <div className="col-md-10">
                <AppRoutes handleSessionChange={this.handleSessionChange}/>
            </div>
        </div>);
    }
}
