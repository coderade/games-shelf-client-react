import {Navigate, Outlet, useLocation} from 'react-router-dom'
import Home from "../components/Home";

const ProtectedRoutes=(session) =>{
    const location = useLocation();
    if(location.pathname === "/"){
        return <Home/>
    }
    else{
        return session.session && session.session.signed?<Outlet/>: <Navigate to="/login"/>
    }
}

export default ProtectedRoutes;