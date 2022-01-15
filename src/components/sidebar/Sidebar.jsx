import React from 'react';
import "./sidebar.css"
import { Users } from '../../dummyData';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseFriend from '../closefriend/CloseFriend';
function Sidebar(props) {
    return (
        <div className="sidebar">
           <div className="sidebarWrapper">
              <u1 className="sidebarList">
                  <li className="sidebarListItem">
                      <RssFeedIcon className="sidebarIcon"/>
                      <span className="sidebarListItemText">Feed</span>
                  </li>
                  <li className="sidebarListItem">
                     <HelpOutlineIcon className="sidebarIcon"/>
                      <span className="sidebarListItemText">Questions</span>
                  </li>
                 
              </u1>
              <button className="sidebarButton">Show More
              </button>
              <hr className="sidebarHr" />
              <ul className="sidebarFriendList">
                  {Users.map((u)=>(
                      <CloseFriend key={u.id} user={u} />
                  ))}
                  
              </ul>
           </div>
        </div>
    );
}

export default Sidebar;