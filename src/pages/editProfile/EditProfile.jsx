import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useContext ,useRef,useState,useEffect} from "react";
import axios from "axios";
import TopBar from '../../components/topbar/TopBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./editprofile.css"
import { Link } from "react-router-dom";



function EditProfile(props) {
    const {user:currentUser} = useContext(AuthContext);
    const desc = useRef();
    const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 

  

    

    


    return (props.trigger) ? (
        <div className="edit">
          <div className="editbox">
        <div className="editTop">
        <div className="editTopLeft">
        <Link to={`/profile/${currentUser.username}`}>
        <div className="editIcon" onClick={()=>props.setTrigger(false)}><ArrowBackIcon/></div>
        </Link>
         <div className="editHead"> Edit Profile</div>
          </div>
          
          </div>
          <div className="editProf">
          <img
                src={
                  currentUser.profilePicture? PF + currentUser.profilePicture
                    : PF + "profile/noprof.png"
                }
                alt=""
              className="editImg"
               />
            <div className="editName">{currentUser.username}</div>
          </div>

     
        {props.children}

        </div>
        </div>
       
    ):"";
}


export default EditProfile;