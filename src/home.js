import React from "react";
import './home.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
export default function Home(){
    const navigate= useNavigate();
    const [formState,setFormState]=React.useState("Signin");
    const [formData,setFormData]=React.useState({username:"",email:"",password:""});
    const [dataVisi,setDataVisi]=React.useState("false");
    function handleClick(){
        if(dataVisi==="false")
            setDataVisi(prev=>"true");
        else
            setDataVisi(prev=>"false");
    }
    React.useEffect(() => {
        let isAuth = JSON.parse(localStorage.getItem('userDetails')).isLoggedIn;
        if(isAuth) {
            navigate("/smartShopingKart/dashboard/");
        }
    }, [navigate]);
    function handleformState(event){
        setFormState(prev=>event.target.name);
        setFormData(prev=>({
            username:"",
            email:"",
            password:""
        }));
    }
    function handleChange(event){
        setFormData(prev=>({
            ...prev,
            [event.target.name]:event.target.value
        }));
    }
    function handleSubmit(event){
        event.preventDefault();
        if(event.target.name==="login"){
            axios({
                method: 'post',
                url:"http://3.109.55.185:4000/signin",
                headers: {'Content-Type': 'application/json'}, 
                withCredentials:true,
                data: {
                    username:formData.username,
                    password:formData.password
                }
            }).then(response=>{
                localStorage.setItem("userDetails",JSON.stringify(response.data));
                setTimeout(()=>{
                    navigate("/smartShopingKart/dashboard/");
                },1000);
            });
        }
        else{
            axios({
                method: 'post',
                url:"http://3.109.55.185:4000/register",
                headers: {'Content-Type': 'application/json'}, 
                withCredentials:true,
                data: {
                    username:formData.username,
                    email:formData.email,
                    password:formData.password
                }
            }).then(response=>{
                console.log(response.data);
                setTimeout(()=>{
                    navigate("/smartShopingKart/");
                },500);
            });
        }
    }
    return(
        <div className="homeBody">
            <img src={process.env.PUBLIC_URL+"/images/waveBg.png"} alt="waves" className="waveBg" />
            <motion.img src={process.env.PUBLIC_URL+"/images/homeImg.png"} alt="thaila" className="homeImg" initial={{ y: '-10vh',opacity:0}} animate={{y:'0vh',opacity:1}} transition={{type:'spring', duration: 2, bounce:0}} />
            <motion.div className="logoDiv" initial={{ y: '-10vh',opacity:0}} animate={{y:'0vh',opacity:1}} transition={{type:'spring', duration: 2, bounce:0}} >
                <img src={process.env.PUBLIC_URL+"/images/logo.png"} alt="logo" className="logo" />
                <span className="logoTitle">Smart Kart</span>
            </motion.div>
            <div className="navbar">
                <button className="navBtn" data-visibility={dataVisi} onClick={handleformState} name="Signin" >Sign In</button>
                <button className="navBtn" data-visibility={dataVisi} onClick={handleformState} name="Register">Register</button>
                <img src={process.env.PUBLIC_URL+"/images/hamImg.png"} className="hamImg" alt="ham" onClick={handleClick} />
            </div>
            <motion.div className="formDiv" initial={{ y: '-10vh',opacity:0}} animate={{y:'0vh',opacity:1}} transition={{type:'spring', duration: 2, bounce:0}}>
                { formState==="Signin" ?  
                <form className="formBody">
                    <span className="signIn">Sign in</span>
                    <span className="subTitle">Username:</span>
                    <input type="text" className="textBox" onChange={handleChange} placeholder="Enter Username" name="username" value={formData.username}/>
                    <span className="subTitle">Password:</span>
                    <input type="password" className="textBox" onChange={handleChange} placeholder="Enter Password" name="password" value={formData.password} />
                    <button className="loginButton" onClick={handleSubmit} name="login" >LOGIN</button>
                </form>:
                <form className="formBody">
                    <span className="signIn">Register</span>
                    <span className="subTitle">Username:</span>
                    <input type="text" className="textBox" onChange={handleChange} placeholder="Enter Username" name="username" value={formData.username} />
                    <span className="subTitle">Email</span>
                    <input type="text" className="textBox" onChange={handleChange} placeholder="Enter Email" name="email" value={formData.email}/>
                    <span className="subTitle">Password:</span>
                    <input type="password" className="textBox" onChange={handleChange} placeholder="Enter Password" name="password" value={formData.password}/>
                    <button className="loginButton" onClick={handleSubmit} name="register" >REGISTER</button>
                </form>
                }
            </motion.div>
        </div>
    );
}