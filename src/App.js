import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Home from './home';
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>     
    </div>
  );
}

export default App;
