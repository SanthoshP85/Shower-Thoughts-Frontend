
import Home from './pages/home/Home';
import { useContext, useEffect, useState } from "react";
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import EditPost from './pages/editpost/EditPost';
import Register from './pages/register/Register';
import React, {Fragment} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";



import { AuthContext } from "./context/AuthContext";
import EditProfile from './pages/editProfile/EditProfile';




function App() {
  const { user } = useContext(AuthContext);

 
  
  return (
    <Router>
      <Fragment>
      <Routes>
        
      <Route exact path='/' 
         element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
        
        <Route path="/register" element = {user ? <Navigate to="/" /> : <Register />}/>
        
        
        <Route path='/profile/:username' element={<Profile/>}/>
        <Route path='/edit/:username' element={<EditPost/>}/>
        <Route path='/edit/:username' element={<EditProfile/>}/>
          
        </Routes>
        </Fragment>
        </Router>
      
     );
}

export default App;
