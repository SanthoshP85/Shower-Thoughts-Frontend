import React from 'react';
import "./rightbar.css"
import {Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useContext ,useRef,useState,useEffect} from "react";

function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(sessionStorage.getItem('selectedOption') || currentUser.followings.includes(user?.id));
  useEffect(() => {
    setFollowed(JSON.parse(window.sessionStorage.getItem("followed")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("followed", followed);
  }, [followed]);



  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("https://showerthoughtsbackend.herokuapp.com/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`https://showerthoughtsbackend.herokuapp.com/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`https://showerthoughtsbackend.herokuapp.com/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

 

    return (
        <>
        <div className="rightbar">
            <div className="rightbarWrapper">
            {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick} >
             {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
            <h4 className="rightbarTitle">User Information:</h4>
            <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                 <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                 <span className="rightbarInfoValue">{user.from}</span>
            </div>
            
            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "profile/noprof.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
            </div>
            </div>
        </>
       
    );
}

export default Rightbar;