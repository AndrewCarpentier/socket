import { useState } from "react";
import {
  getCurrentUser,
  login as signin,
  logout as signout,
} from "../api/Auth";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData } from "react-router-dom";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(useLoaderData());

  async function login(credentials) {
    setUser(await signin(credentials));
  }

  async function logout() {
    signout();
    setUser(null);
  }

  async function getCurrent() {
    setUser(await getCurrentUser());
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getCurrent }}>
      {children}
    </AuthContext.Provider>
  );
}
