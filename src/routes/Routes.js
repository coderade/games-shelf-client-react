import {Route, Routes} from "react-router-dom";
import Games from "../components/Game/Games";
import Game from "../components/Game/Game";
import Genres from "../components/Genre/Genres";
import Genre from "../components/Genre/Genre";
import Platforms from "../components/Platforms/Platforms";
import Platform from "../components/Platforms/Platform";
import Admin from "../components/Admin/Admin";
import AddEditGame from "../components/Admin/Games/AddEditGame";
import Home from "../components/Home";
import React from "react";
import Login from "../components/Login/Login";
import ProtectedRoutes from "./ProtectedRoute";

const AppRoutes = (props) => {
    return (<Routes>
        <Route exact path="/login" element={<Login handleSessionChange={props.session.handleSessionChange}/>}/>
        <Route path="/games" element={<Games/>}/>
        <Route path="/games/:id" element={<Game signed={props.session.signed}/>}/>
        <Route path="/genres" element={<Genres/>}/>
        <Route path="/genres/:id" element={<Genre/>}/>
        <Route path="/platforms" element={<Platforms/>}/>
        <Route path="/platforms/:id" element={<Platform/>}/>

        <Route path="/" element={<ProtectedRoutes session={props.session}/>}>
            <Route path="/admin" element={<Admin/>}/>
            <Route exact path="/admin/games/add" element={<AddEditGame/>}/>
            <Route exact path="/admin/games/edit/:id" element={<AddEditGame session={props.session}/>}/>
        </Route>

        <Route path="/" element={<Home/>}/>
    </Routes>)
}

export default AppRoutes;