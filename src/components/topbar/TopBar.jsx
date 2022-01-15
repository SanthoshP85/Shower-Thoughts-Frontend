import React from 'react';
import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from "react";
import History from "../../pages/login/Login"
import { AuthContext } from '../../context/AuthContext';
import Login from '../../pages/login/Login';
import Search from '../search/Search';
import { Server } from "socket.io";
import { io } from "socket.io-client";
function TopBar() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [editPopup,setEditPopup]=useState(false);
    const [search,setSearch] = useState('')
    const {state,dispatch} = useContext(AuthContext);
    const [userDetails,setUserDetails] = useState([]);
  
    const clickHandler=()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        window.location.href = `/login`;
    }
 
    const fetchUsers = (query)=>{
        setSearch(query)
        fetch('https://showerthoughtsbackend.herokuapp.com/api/users/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=> {
            setUserDetails(results.user)
            
          console.log(results)
        })
        
     }
 


    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="link">
                <span className="logo">ShowerThoughts</span>
                </Link>
          
           
                <div className="searchbar">
                <Link to="/" className="link">
                   <SearchIcon  onClick={()=> setEditPopup(true)} className="searchIcon"/>
                   </Link>
                   <Search trigger={editPopup} setTrigger={setEditPopup}>
                
                 <input
                 className="searchInput"
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            autofocus
            />

<ul class="collection">
{userDetails.map(item=>{
    return ( 
        <Link to={`/profile/${item.username}`} onClick={()=>{
            setSearch('')
          }}>
    <li class="collection-item">{item.username} </li>
    
    </Link>

)})}
     
    </ul>
    <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>

                       </Search>
                </div>
            </div>
            <div className="topbarRight">
               
               
                    
                        
                        
                
                <Link to={`/profile/${user.username}`}>
                <img
                src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "profile/noprof.png"
                  }s
                alt=""
              className="topbarImg"
               />
                </Link>
                <Link to={`/login`}  underline="none">
            <div className="logoutButton" onClick={clickHandler}>Log Out</div>
            </Link>
            </div>
            
        </div>
    );
}

export default TopBar;