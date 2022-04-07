import {Link, Route, Routes} from "react-router-dom";
import Games from "./Game/Games";
import Game from "./Game/Game";
import Genres from "./Genre/Genres";
import Genre from "./Genre/Genre";
import Platforms from "./Platforms/Platforms";
import Platform from "./Platforms/Platform";
import Admin from "./Admin/Admin";
import Home from "./Home";
import React, {Component} from "react";
import EditGame from "./Admin/Games/EditGame";

export default class Navbar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <nav>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="/">Home </Link>
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
                    <Routes>
                        <Route path="/games" element={<Games/>}/>
                        <Route path="/games/:id" element={<Game/>}/>
                        <Route path="/genres" element={<Genres/>}/>
                        <Route path="/genres/:id" element={<Genre/>}/>
                        <Route path="/platforms" element={<Platforms/>}/>
                        <Route path="/platforms/:id" element={<Platform/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/admin/games/add" element={<EditGame/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}
