import React from "react";
import './home.css';

export default function Home(){
    const [formState,setFormState]=React.useState("Signin");
    function handleformState(event){
        setFormState(prev=>event.target.name);
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
                { formState==="Signin" && 
                <form className="formBody">
                    <span className="signIn">Sign in</span>
                    <span className="subTitle">Username:</span>
                    <input type="text" className="textBox"/>
                    <span className="subTitle">Password:</span>
                    <input type="text" className="textBox"/>
                    <button className="loginButton">LOGIN</button>
                </form>
                }
            </div>
        </div>
    );
}