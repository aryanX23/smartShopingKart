import React from "react";
import './dashboard.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clientSocket from 'socket.io-client';
export default function Dashboard(){
    const [productList,setProductList]=React.useState([]);
    const [total,setTotal]=React.useState(0);
    const [customer,setCustomer]=React.useState("");
    React.useEffect(() => {
        const socket=clientSocket('http://3.108.74.54:4000');
        socket.on('dataArduino',response=>{
            console.log(response.data);
            setProductList(prev=>[
                ...prev,
                {
                    name:response.name,
                    price:response.price
                }
            ]);
            setTotal(prev=>prev+response.price);
        });
            // eslint-disable-next-line
    },[]);
    const navigate=useNavigate();
    function handleLogOut(){
        axios({
            method: 'post',
            url:"http://3.108.74.54:4000/logout",
            headers: {'Content-Type': 'application/json'}, 
            withCredentials:true
        }).then(response=>{
            localStorage.setItem("userDetails",JSON.stringify({isLoggedIn:false}));
            navigate("/smartShopingKart/");
        });
    }
    function handleChange(event){
        setCustomer(prev=>event.target.value);
    }
    function handleChoice(event){
        if(event.target.name === "reject"){
            setProductList([]);
            setTotal(0);
        }
        else if(event.target.name === "accept" && productList !== []){
            axios({
                method: 'post',
                url:"http://localhost:4000/saveProductList",
                headers: {'Content-Type': 'application/json'}, 
                withCredentials:true,
                data: {
                    name:productList.name,
                    price:productList.price,
                    customer:customer
                }
            });
            setProductList([]);
            setTotal(0);
            setCustomer("");
        }
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
                            {productList.map((product, index) => (
                            <tr data-index={index}>
                                <td></td>
                                <td>{product.name}</td>
                                <td>{product.price} Rs</td>
                            </tr>
                            ))}
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td>{total} Rs</td>
                            </tr>
                        </table>
                    </div>
                    <input type="text" className="customerName" onChange={handleChange} value={customer} placeholder="Enter Customer Name"/>
                    <div className="buttonDiv" onClick={handleChoice} >
                        <button className="divBtn" name="accept" onClick={handleChoice}>Accept</button>
                        <button className="divBtn" name="reject" onClick={handleChoice}>Reject</button>
                    </div>
                </div>
                <div className="rightSide">
                    <img src={process.env.PUBLIC_URL+"/images/dashImg.png"} className="dashImg" alt="dashImg" />
                </div>
            </div>
        </div>
    );
}
