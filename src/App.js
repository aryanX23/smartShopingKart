import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Home from './home';
import { Routes, Route, Navigate } from "react-router-dom"
import axios from 'axios';
import PrivateRoutes from './utils/privateRoutes';

function App() {
  React.useEffect(()=>{axios({
    method: 'post',
    url:"http://localhost:4000/login",
    headers: {'Content-Type': 'application/json'}, 
    withCredentials:true
    }).then(response=>{
        localStorage.setItem("userDetails",JSON.stringify(response.data));
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
