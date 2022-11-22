import React from "react";
import './home.css';
import axios from 'axios';

export default function Home(){
    const [formState,setFormState]=React.useState("Signin");
    const [formData,setFormData]=React.useState({username:"",email:"",password:""});
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
        if(event.target.name==="login"){
            axios({
                method: 'post',
                url:"http://localhost:4000/signin",
                headers: {'Content-Type': 'application/json'}, 
                withCredentials:true,
                data: {
                    username:formData.username,
                    password:formData.password
                }
            }).then(response=>console.log(response.data));
        }
        else{
            axios({
                method: 'post',
                url:"http://localhost:4000/register",
                headers: {'Content-Type': 'application/json'}, 
                withCredentials:true,
                data: {
                    username:formData.username,
                    email:formData.email,
                    password:formData.password
                }
            }).then(response=>console.log(response.data));
        }
    }
    return(
        <div className="homeBody">
            <img src={process.env.PUBLIC_URL+"/images/waveBg.png"} alt="waves" className="waveBg" />
            <img src={process.env.PUBLIC_URL+"/images/homeImg.png"} alt="thaila" className="homeImg"/>
            <div className="logoDiv">
                <img src={process.env.PUBLIC_URL+"images/logo.png"} alt="logo" className="logo" />
                <span className="logoTitle">Smart Kart</span>
            </div>
            <div className="navbar">
                <button className="navBtn" onClick={handleformState} name="Signin" >Sign In</button>
                <button className="navBtn" onClick={handleformState} name="Register">Register</button>
                <img src={process.env.PUBLIC_URL+"/images/hamImg.png"} className="hamImg" alt="ham" />
            </div>
            <div className="formDiv">
                { formState==="Signin" ?  
                <form className="formBody">
                    <span className="signIn">Sign in</span>
                    <span className="subTitle">Username:</span>
                    <input type="text" className="textBox" onChange={handleChange} name="username" value={formData.username}/>
                    <span className="subTitle">Password:</span>
                    <input type="password" className="textBox" onChange={handleChange} name="password" value={formData.password} />
                    <button className="loginButton" onClick={handleSubmit} name="login" >LOGIN</button>
                </form>:
                <form className="formBody">
                    <span className="signIn">Register</span>
                    <span className="subTitle">Username:</span>
                    <input type="text" className="textBox" onChange={handleChange} name="username" value={formData.username} />
                    <span className="subTitle">Email</span>
                    <input type="text" className="textBox" onChange={handleChange} name="email" value={formData.email}/>
                    <span className="subTitle">Password:</span>
                    <input type="password" className="textBox" onChange={handleChange} name="password" value={formData.password}/>
                    <button className="loginButton" onClick={handleSubmit} name="register" >REGISTER</button>
                </form>
                }
            </div>
        </div>
    );
}