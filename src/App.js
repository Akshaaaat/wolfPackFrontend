import React, { useContext } from 'react';
import './App.css';
import BackendFunctions from './globaltools/backendFunctions';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage'
import GlobalFunctionsAndVars from './globaltools/GlobalFunctionsAndVars';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {

  return (
    <GlobalFunctionsAndVars>
    <div className="App">
        <BrowserRouter>
        <BackendFunctions />
        <Routes>
          <Route path="/">
            <Route index element={<><Navbar/> <HomePage/> </>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </GlobalFunctionsAndVars>
  );
}

export default App;
