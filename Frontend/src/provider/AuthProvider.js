import { useState } from "react";
import {login as signin} from '../api/Auth'
import {AuthContext} from '../context/AuthContext';

export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    async function login(credentials){
        setUser(await signin(credentials));
    }

    return <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>
}