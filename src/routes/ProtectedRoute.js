import {Navigate, Outlet} from 'react-router-dom'

const  ProtectedRoutes=(session) =>{
    return session.session && session.session.signed?<Outlet/>: <Navigate to="/login"/>
}

export default ProtectedRoutes;