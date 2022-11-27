import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Home from './home';
import { Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios';

function App() {
  const [userDetails,setUserDetails]=React.useState({isLoggedIn:false});
  React.useEffect(()=>{axios({
    method: 'post',
    url:"http://65.2.153.8:4000/login",
    headers: {'Content-Type': 'application/json'}, 
    withCredentials:true
    }).then(response=>{
        setUserDetails(prev=>(response.data));
    });
  },[]);
  console.log(userDetails);
  return (
    <div className="App">
      <Routes>
        <Route path="/smartShopingKart/" element={ userDetails.isLoggedIn?<Dashboard username={userDetails.user_name} />:<Home/> } />
      </Routes>     
    </div>
  );
}

export default App;
