import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Home from './home';
import { Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios';

function App() {
  localStorage.setItem("userDetails",JSON.stringify({isLoggedIn:false}));
  React.useEffect(()=>{axios({
    method: 'post',
    url:"http://65.2.73.149:4000/login",
    headers: {'Content-Type': 'application/json'}, 
    withCredentials:true
    }).then(response=>{
        localStorage.setItem("userDetails",JSON.stringify(response.data));
    });
  },[]);
  return (
    <div className="App">
      <Routes>
        <Route path="/smartShopingKart/" element={JSON.parse(localStorage.getItem("userDetails")).isLoggedIn?<Dashboard/>:<Home/> } />
        <Route path="*" element={<Navigate to="/smartShopingKart/" replace />}/>
      </Routes>     
    </div>
  );
}

export default App;
