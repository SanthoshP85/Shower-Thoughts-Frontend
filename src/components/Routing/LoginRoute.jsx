import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes,
  } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
const LoginRoute= () => {
    const { user } = useContext(AuthContext);
   

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Navigate to="/" /> : <Login />
}
export default LoginRoute;