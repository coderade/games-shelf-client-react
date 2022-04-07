import './App.css';
import React from 'react'
import {HashRouter as Router} from 'react-router-dom'
import Navbar from "./components/Navbar";

function App() {
    return (<Router>
        <div className={"container"}>
            <div className="row">
                <h1 className="mt-3">
                    Games Shelf
                </h1>
                <hr className="mb-3"/>
            </div>
            <Navbar/>
        </div>
    </Router>);
}

export default App;
