import React from 'react';
import { Navigate} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
const RegisterRoute= () => {
    const { user } = useContext(AuthContext);
   

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Navigate to="/" /> : <Register />
}
export default RegisterRoute;
