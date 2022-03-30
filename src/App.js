import './App.css';
import React, {Fragment} from 'react'
import Games from './components/Games'
import Home from './components/Home'
import Admin from './components/Admin'
import {HashRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className={"container"}>
                <div className="row">
                    <h1 className="mt-3">
                        Go Play a Game!
                    </h1>
                    <hr className="mb-3"></hr>
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
                                  <Link to="/admin">Manage Games </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-10">
                      <Routes>
                          <Route path="/games/:id" element={<Game/>} >
                          </Route>
                        <Route path="/games/" element={<Games/>} />
                        <Route path="/admin" element={<Admin/>} />
                        <Route path="/" element={<Home/>} />
                      </Routes>
                    </div>
                </div>
            </div>
        </Router>);
}

export default App;

function Game(){
    let { id } = useParams();
    return <h2> Game id {id}</h2>
}
