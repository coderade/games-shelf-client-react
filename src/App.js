import './App.css';
import React from 'react'
import Games from './components/Game/Games'
import Home from './components/Home'
import Admin from './components/Admin/Admin'
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Genres from "./components/Genre/Genres";
import Genre from "./components/Genre/Genre";
import Game from "./components/Game/Game";
import Platforms from "./components/Platforms/Platforms";
import Platform from "./components/Platforms/Platform";

function App() {
    return (<Router>
        <div className={"container"}>
            <div className="row">
                <h1 className="mt-3">
                    Go Play a Game!
                </h1>
                <hr className="mb-3"/>
            </div>
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
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    </Router>);
}

export default App;
