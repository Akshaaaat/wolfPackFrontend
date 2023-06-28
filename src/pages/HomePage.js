import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from "../globaltools/GlobalFunctionsAndVars";
import {loadLogs, addMoney, loadData, transferMoney} from '../globaltools/backendFunctions'
import { showBankBalance, showDetails, showLogs, doTransaction } from "../globaltools/chatBotFunctions";
import "./pc.css";

const HomePage = () =>{
  let token
  const navigate = useNavigate();
  let  {email, setEmail, userName, setUserName, backEndUrl} = useContext(UserContext)
  
  useEffect(()=>{
    token = localStorage.getItem("wolfpackauthtoken");
    if (!token) navigate("/login");
  }, [])

  return(
    <>
      <div>This is the homepage</div>
      <button className = "btn btn-success" onClick = {(e)=>{e.preventDefault(); loadLogs()}}>Check Logs</button>
      <button className = "btn btn-success" onClick = {(e)=>{e.preventDefault(); loadData()}}>getDetails</button>
      <button className = "btn btn-info" onClick = {(e)=>{e.preventDefault(); showBankBalance()}}>Show Bank Balance</button>
      <button className = "btn btn-info" onClick = {(e)=>{e.preventDefault(); showLogs()}}>Show Logs</button>
      <button className = "btn btn-info" onClick = {(e)=>{e.preventDefault(); showDetails()}}>Show Details</button>
      <button className = "btn btn-success" onClick = {(e)=>{e.preventDefault(); doTransaction('nikita@email.com', 100)}}>Donate</button>
      <button className = "btn btn-danger" onClick = {(e)=>{e.preventDefault(); addMoney(10000)}}>AddMoni</button>
      Name is {userName} & Email is {email}
    </>
  )

}

export default HomePage