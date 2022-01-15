import React from 'react';
import ReactDOM from 'react-dom';
import {AuthContextProvider} from "./context/AuthContext";
import App from './App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      
    <App />
   
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

