import React, { useEffect } from 'react';
import "./postprof.css"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import {format} from 'timeago.js';
import { Link } from "react-router-dom";
import { useContext } from "react";
import {useState,useRef} from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import EditPost from '../../pages/editpost/EditPost';
import { useParams } from "react-router";
import PermMediaIcon from '@mui/icons-material/PermMedia';
export default function PostProf({ post }) {
  const username = useParams().username;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [editPopup,setEditPopup]=useState(false);
  const [file, setFile] = useState(null);
  
  const desc = useRef();
 


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://showerthoughtsbackend.herokuapp.com/api/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

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
      window.location.reload();
    } catch (err) {}

  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatePost = {
      userId: currentUser._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatePost.img = fileName;
      console.log(updatePost);
       try {
        await axios.post("https://showerthoughtsbackend.herokuapp.com/api/upload", data);
       } catch (err) {}
    }
    try {
      await axios.put("https://showerthoughtsbackend.herokuapp.com/api/posts/"+post._id, updatePost);
      window.location.reload();
    } catch (err) {}
  };
 
   
   
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
          <img className="postImg" src={PF + post.img}  alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          {isLiked ?(
              <img
              className="likeIcon"src={`${PF}heartR.png`} onClick={likeHandler}alt=""/>
            ):(
<img className="likeIcon"src={`${PF}heartB.png`} onClick={likeHandler}alt=""/>
            )}
            
           
            <div className="postLikeCounter">{like} likes</div>
          </div>
          <div className="postBottomRight" >
            
          <div className="postEdit" onClick={()=> setEditPopup(true)} style={{display: (user.username==currentUser.username) ? 'inline' : 'none' }} > Edit</div>
          <EditPost trigger={editPopup} setTrigger={setEditPopup}>
          <form className="editProfileStart" onSubmit={submitHandler}>
          <div className="editLabel">Edit Photo</div>
                  <label htmlFor="file" className="editProfileImg">
                    <PermMediaIcon htmlColor="tomato" className="editProfileImg" />
                    
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                
                <div className="editCenter">
            <div className="editLabel">About Post</div>
            <textarea className="editTextArea" cols="30" rows="10" ref={desc} defaultValue={post.desc}></textarea>
          
       
      </div>
      <div className="divimg"style={{display: (post.img) ? 'block' : 'none' }}>
      <img className="editPostImg" src={PF + post.img}
        alt=""  />
      </div>
               
                <button className="editSave" type="submit" >
                  Save
                </button>
           
                
              </form>


              
          </EditPost>
          
            <div className="postDelete" onClick={deleteHandler} style={{display: (user.username==currentUser.username) ? 'inline' : 'none' }}> Delete</div>
            
          
          </div>

        </div>
      </div>
    </div>
  );
}