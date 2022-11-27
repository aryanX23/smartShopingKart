import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Home from './home';
import { Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios';
import PrivateRoutes from './utils/privateRoutes';

function App() {
  localStorage.setItem("userDetails",JSON.stringify({isLoggedIn:true}));
  React.useEffect(()=>{axios({
    method: 'post',
    url:"http://65.2.73.149:4000/login",
    headers: {'Content-Type': 'application/json'}, 
    withCredentials:true
    }).then(response=>{
      console.log(response);
        localStorage.setItem("userDetails",JSON.stringify(response.data));
        console.log(JSON.parse(localStorage.getItem("userDetails")));
    });
  },[]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/smartShopingKart/" element={<Home/> } />
        <Route element={<PrivateRoutes/>}>
          <Route exact path="/smartShopingKart/dashboard/" element={<Dashboard/> } />
        </Route>
        <Route path="*" element={<Navigate to="/smartShopingKart/" replace />}/>
      </Routes>     
    </div>
  );
}

export default App;
