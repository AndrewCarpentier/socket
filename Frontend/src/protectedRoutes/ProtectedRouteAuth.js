import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRouteAuth({children}){
    const {user} = useContext(AuthContext);
    return user ? <Navigate to='/message'/> : children;
}

export default ProtectedRouteAuth;