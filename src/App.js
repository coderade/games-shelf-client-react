import './App.css';
import React from 'react'
import Games from './components/Game/Games'
import Home from './components/Home'
import Admin from './components/Admin/Admin'
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Genres from "./components/Genre/Genre";
import Genre from "./components/Genre/Genres";
import Game from "./components/Game/Game";
import Platform from "./components/Platforms/Platform";
import Platforms from "./components/Platforms/Platforms";

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
                                <Link to="/by-genre">Genres </Link>
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
                        <Route path="/games/:id" element={<Game id={':id'}/>}/>
                        <Route path="/games" element={<Games/>}/>
                        <Route exact path="/by-genre" element={<Genres/>}/>
                        <Route exact path="/by-genre/adventure" element={<Genre title={`Adventure`}/>}/>
                        <Route exact path="/by-genre/action" element={<Genre title={`Action`}/>}/>
                        <Route exact path="/platforms" element={<Platforms/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    </Router>);
}

export default App;
