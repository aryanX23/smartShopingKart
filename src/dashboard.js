import React from "react";
import './dashboard.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clientSocket from 'socket.io-client';
export default function Dashboard(){
    React.useEffect(() => {
        const socket=clientSocket('http://localhost:4000');
        socket.on('dataArduino',response=>{
            console.log(response);
        });
            // eslint-disable-next-line
    },[]);
    const navigate=useNavigate();
    function handleLogOut(){
        axios({
            method: 'post',
            url:"http://localhost:4000/logout",
            headers: {'Content-Type': 'application/json'}, 
            withCredentials:true
        }).then(response=>{
            setTimeout(()=>{
                navigate("/smartShopingKart/");
            },500);
        });
    }
    function handleChoice(){

    }
    return(
        <div className="dashBody">
            <img src={process.env.PUBLIC_URL+"/images/waveBg.png"} alt="waves" className="waveBg" />
            <div className="upperNav">
                <div className="navLeft">
                    <img src={process.env.PUBLIC_URL+"/images/logo.png"} alt="logo" className="logo"/>
                    <span className="navTitle">Smart Kart</span>
                </div>
                <div className="navRight">
                    <div className="workerBox">
                        <span className="workerName">Worker 1</span>
                    </div>
                    <img src={process.env.PUBLIC_URL+"/images/logOutBtn.png"} onClick={handleLogOut} alt="logOut" className="logOutBtn"/>
                </div>
            </div>
            <div className="lowerBody">
                <div className="leftSide">
                    <div className="productTitle"><span>PRODUCT LIST</span></div>
                    <div className="productList">
                        
                    </div>
                    <input type="text" className="customerName" placeholder="Enter Customer Name"/>
                    <div className="buttonDiv" onClick={handleChoice} >
                        <button className="divBtn">Accept</button>
                        <button className="divBtn">Reject</button>
                    </div>
                </div>
                <div className="rightSide">
                    <img src={process.env.PUBLIC_URL+"/images/dashImg.png"} className="dashImg" alt="dashImg" />
                </div>
            </div>
        </div>
    );
}