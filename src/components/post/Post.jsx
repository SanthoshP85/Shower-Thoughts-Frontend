import React, { useEffect } from 'react';
import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {format} from 'timeago.js';
import { Link } from "react-router-dom";
import { useContext } from "react";
import {useState} from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
export default function Post({ post}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);





  

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://showerthoughtsbackend.herokuapp.com/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  

  const likeHandler = () => {
    try {
      axios.put("https://showerthoughtsbackend.herokuapp.com/api/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    
  };

  const deleteHandler= ()=>{
    try {
      axios.delete("https://showerthoughtsbackend.herokuapp.com/api/posts/" + post._id, { userId: currentUser._id } );
      
    } catch (err) {}

  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "profile/noprof.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ?(
              <img
              className="likeIcon"src={`${PF}heartR.png`} onClick={likeHandler}alt=""/>
            ):(
<img className="likeIcon"src={`${PF}heartB.png`} onClick={likeHandler}alt=""/>
            )}
            
           
            <span className="postLikeCounter">{like} likes</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}