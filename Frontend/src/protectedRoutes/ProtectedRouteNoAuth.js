import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRouteNoAuth({children}){
    const {user} = useContext(AuthContext);
    return user ? children : <Navigate to="/"/>
}

export default ProtectedRouteNoAuth;