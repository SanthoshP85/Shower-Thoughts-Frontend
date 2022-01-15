import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext ,useRef,useState,useEffect} from "react";
import axios from "axios";
import TopBar from '../../components/topbar/TopBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./search.css"
import { Link } from "react-router-dom";



function Search(props) {
    const {user:currentUser} = useContext(AuthContext);
    const desc = useRef();
    const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 

  

    

    


    return (props.trigger) ? (
        <div className="edit">
          <div className="editbox">
        <div className="editTop">
        <div className="editTopLeft">
        <Link to={`/`}>
        <div className="editIcon" onClick={()=>props.setTrigger(false)}><ArrowBackIcon/></div>
        </Link>
         <div className="editHead"> Search</div>
          </div>
          
          </div>
         
     
        {props.children}

        </div>
        </div>
       
    ):"";
}


export default Search;