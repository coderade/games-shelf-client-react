import {Route, Routes} from "react-router-dom";
import Games from "../components/Game/Games";
import Game from "../components/Game/Game";
import Genres from "../components/Genre/Genres";
import Genre from "../components/Genre/Genre";
import Platforms from "../components/Platforms/Platforms";
import Platform from "../components/Platforms/Platform";
import Admin from "../components/Admin/Admin";
import EditGame from "../components/Admin/Games/AddEditGame";
import Home from "../components/Home";
import React from "react";
import Login from "../components/Login/Login";

const AppRoutes = (props) =>{
    return (<Routes>
        <Route exact path="/login" element={<Login handleSessionChange={props.handleSessionChange}/>}/>
        <Route path="/games" element={<Games/>}/>
        <Route path="/games/:id" element={<Game/>}/>
        <Route path="/genres" element={<Genres/>}/>
        <Route path="/genres/:id" element={<Genre/>}/>
        <Route path="/platforms" element={<Platforms/>}/>
        <Route path="/platforms/:id" element={<Platform/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route exact path="/admin/games/add" element={<EditGame/>}/>
        <Route exact path="/admin/games/edit/:id" element={<EditGame/>}/>
        <Route path="/" element={<Home/>}/>
    </Routes>)
}

export default AppRoutes;