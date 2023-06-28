/*
    This file contains the global variables which may by needed anywhere across the 
    document. These variables are made global using the useContext react hook.
*/
import React from 'react';
import { useState, createContext } from "react";
const backEndUrl = "http://localhost:3000";

const GlobalFunctionsAndVars = (props) =>{
    const [email, setEmail] = useState(localStorage.getItem('wolfpackemail'))
    const [userName, setUserName] = useState(localStorage.getItem('wolfpackusername'))
    
    return(  
        <UserContext.Provider value ={{email, setEmail, userName, setUserName, backEndUrl}}>
            {props.children}
        </UserContext.Provider>
    )
}
const UserContext = createContext()
 
export default GlobalFunctionsAndVars
export {UserContext}