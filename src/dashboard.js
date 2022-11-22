import React from "react";
import './dashboard.css';

export default function Dashboard(){
    return(
        <div className="dashBody">
            <div className="upperDiv">
                <div className="logoDiv">
                    <img src={process.env.PUBLIC_URL+"/images/logo.png"} className="logo" alt="logo" />
                    <span>Smart Kart</span>
                </div>
                <div className="timeContainer">

                </div>
                <div className="userDetails">

                </div>
            </div>
        </div>
    );
}