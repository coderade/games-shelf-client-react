import {Link} from "react-router-dom";
import React, {Component} from "react";
import AppRoutes from "../routes/Routes";

export default class Navbar extends Component {
    render() {
        return (<div className="row">
            <div className="col-md-2">
                <nav>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/games">Games </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/games/add">Add/Edit Game</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/genres">Genres </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/platforms">Platforms </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin">Manage Games </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="col-md-10">
                <AppRoutes/>
            </div>
        </div>);
    }
}
