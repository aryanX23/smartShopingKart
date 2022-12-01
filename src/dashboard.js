import React from "react";
import './dashboard.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clientSocket from 'socket.io-client';
export default function Dashboard(){
    const [name,setName]=React.useState([]);
    const [price,setPrice]=React.useState([]);
    React.useEffect(() => {
        const socket=clientSocket('http://13.232.65.132:4000');
        socket.on('dataArduino',response=>{
            setName(prev=>name.push(response.name));
            setPrice(prev=>price.push(response.price));
        });
            // eslint-disable-next-line
    },[]);
    const navigate=useNavigate();
    function handleLogOut(){
        axios({
            method: 'post',
            url:"http://13.232.65.132:4000/logout",
            headers: {'Content-Type': 'application/json'}, 
            withCredentials:true
        }).then(response=>{
            localStorage.setItem("userDetails",JSON.stringify({isLoggedIn:false}));
            navigate("/smartShopingKart/");
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
                        <table className="styled-table">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>PRODUCT A</td>
                                <td>500 rs</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>PRODUCT B</td>
                                <td>1000 rs</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>PRODUCT C</td>
                                <td>1500 rs</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>PRODUCT D</td>
                                <td>2000 rs</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td>5000 rs</td>
                            </tr>
                        </table>
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