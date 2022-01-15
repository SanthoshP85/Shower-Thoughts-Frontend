import React from 'react';
import Feed from '../../components/feed/Feed';
import {useState,useEffect,useContext} from "react";
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import "./home.css"

function Home() {








    return (
        <>
            <TopBar  />
            <div className="homeContainer">
            
            <Feed />
            
            </div>
            
            {/* http://localhost:8800/api */}
                    </>
    );
}

export default Home;