import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeedProf from "../../components/feedprof/FeedProf";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useParams } from "react-router";
import { useContext ,useRef} from "react";
import { AuthContext } from '../../context/AuthContext';
import EditProfile from '../../pages/editProfile/EditProfile';
import EditIcon from '@mui/icons-material/Edit';

export default function Profile() { 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const descEdit = useRef();
  const cityEdit = useRef();
  const fromEdit = useRef();
  const usernameEdit = useRef();
  const username = useParams().username;
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [editPopup,setEditPopup]=useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://showerthoughtsbackend.herokuapp.com/api/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);



  const submitHandler = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: currentUser._id,
      username:usernameEdit.current.value,
      desc: descEdit.current.value,
      city: cityEdit.current.value,
      from:fromEdit.current.value,
      
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updateUser.profilePicture = fileName;
      
      console.log(updateUser);
      try {
        await axios.post("https://showerthoughtsbackend.herokuapp.com/api/upload", data);
       
      } catch (err) {}
    }

    if (file1) {
      const data = new FormData();
      const fileName1 = Date.now() + file1.name;
      data.append("name", fileName1);
      data.append("file", file1);
      updateUser.coverPicture = fileName1;
      
      console.log(updateUser);
      try {
        await axios.post("https://showerthoughtsbackend.herokuapp.com/api/upload", data);
       
      } catch (err) {}
    }

    try {
      await axios.put("https://showerthoughtsbackend.herokuapp.com/api/users/"+user._id, updateUser);
      localStorage.clear();
        window.location.href = `/`;
    } catch (err) {}
  };


  return (
    <>
      <TopBar />
      <div className="profile">
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "profile/nocover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "profile/noprof.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc" ref={descEdit}>{user.desc}</span>
            </div>
            <div className="editProfileButton" onClick={()=> setEditPopup(true)} style={{display: (user.username==currentUser.username) ? 'block' : 'none' }}>
              <EditIcon></EditIcon>Edit Profile
            </div>
            <EditProfile trigger={editPopup} setTrigger={setEditPopup}>
            
            
        <form className="editProfileStart" onSubmit={submitHandler}>
          <div className="pro">
          
        <div className="profIconName">Profile Picture</div>
       
        
        <div className="profIcon">
                    <label htmlFor="file" className="editProfileImg">
                      <CameraAltIcon htmlColor="blue" className="editProfileImg" />
                      
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    </div>
                    </div>

                <div className="cov">
                    <div className="coverIconName">Cover Picture</div>
                    <div className="covIcon">
                    <label htmlFor="file1" className="editProfileImg">
                      <CameraAltIcon htmlColor="tomato" className="editProfileImg" />
                      
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file1"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile1(e.target.files[0])}
                      />
                    </label>



                    </div>
                    </div>


                  
                  <div className="editCenter">
              <div className="editLabel">Username</div>
            <input className="editText"  ref={usernameEdit} defaultValue={currentUser.username} placeholder="2-10 Characters" />
            <div className="editLabel">Bio</div>
          <input className="editText"  ref={descEdit} defaultValue={currentUser.desc} placeholder="2-15 Characters" />
          <div className="editLabel">City</div>
            <input className="editText"  ref={cityEdit} defaultValue={currentUser.city} placeholder="2-15 Characters" />
            <div className="editLabel">From</div>
          <input className="editText"  ref={fromEdit} defaultValue={currentUser.from} placeholder="2-15 Characters" />
         
        </div>

                  <button className="editSave" type="submit">
                    Save
                  </button>
                  
                  
                </form>
               



          </EditProfile>
            
          </div>
          <div className="profileRightBottom">
            <FeedProf className="feed" username={username} />
            <Rightbar className="rightBar" user={user} />
          </div>
        </div>
      </div>
    </>
  );
}