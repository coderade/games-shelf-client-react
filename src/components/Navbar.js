import React, {Component} from "react";
import AppRoutes from "../routes/Routes";
import {Nav} from "react-bootstrap";
import {AuthContext} from "../contexts/AuthContext";

const Navbar = () => {
    return (<AuthContext.Consumer>
        {session => <div className="row">
            <div className="col-md-2">
                <Nav defaultActiveKey="/#" className="list-group" as="ul">
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-0" href="/#" className="list-group-item">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-1" href="/#/games" className="list-group-item">Games</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-2" href="/#/genres" className="list-group-item">Genres</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-3" href="/#/platforms"
                                  className="list-group-item">Platforms</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="link-graphql" href="/#/graphql"
                                  className="list-group-item">GraphQL</Nav.Link>
                    </Nav.Item>
                    {session.signed ? <Nav.Item as="li">
                        <Nav.Link eventKey="link-admin" href="/#/admin"
                                  className="list-group-item">Admin</Nav.Link>
                    </Nav.Item> : ""}
                </Nav>
            </div>
            <div className="col-md-10">
                <AppRoutes session={session}/>
            </div>
        </div>}

    </AuthContext.Consumer>);
}

export default Navbar;