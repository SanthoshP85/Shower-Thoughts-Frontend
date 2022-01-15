import React from 'react';
import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

import { useContext ,useRef,useState} from "react";
import { AuthContext } from '../../context/AuthContext';
export default function Share(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: currentUser._id,
          desc: desc.current.value,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          try {
            await axios.post("https://showerthoughtsbackend.herokuapp.com/api/upload", data);
          } catch (err) {}
        }
        try {
          await axios.post("https://showerthoughtsbackend.herokuapp.com/api/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };
    
    

        return (
            <div className="share">
              <div className="shareWrapper">
                <div className="shareTop">
                  <img
                    className="shareProfileImg"
                    src={
                      currentUser.profilePicture
                      ? PF + currentUser.profilePicture
                      : PF + "profile/noprof.png"
                    }
                    alt=""
                  />
                  <textarea
                    placeholder={"What's in your mind " + currentUser.username + "?"}
                    className="shareInput"
                    ref={desc}
                  />
                </div>
                
                {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
                <form className="shareBottom" onSubmit={submitHandler}>
                  <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                      <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                      <span className="shareOptionText">Photo</span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    
                  </div>
                  <button className="shareButton" type="submit">
                    Share
                  </button>
                </form>
              </div>
            </div>
          );
        }