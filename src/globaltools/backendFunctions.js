/*
  This file contains the main functions which connect this react frontend to the backend. 
  These functions however return in JSON format which can't be understood easily by the user.
  So, the chatBotFunctions page contains the functions which are reqd convert these objects
  to simple text which can be easily comprehended.
*/

import React, {useContext} from 'react';
import { UserContext } from './GlobalFunctionsAndVars';
let token, backEndUrl = 'http://localhost:3001'

const BackendFunctions = () => { 
  /* NOTE 5617: 
    Wherever we are exporting backend Functions we need to render this react component 
    as well because we can't use userContext Hook if we don't render this function at all.
    We have rendered it in the app.js component so that we don't need to render this component elsewhere.
  */
  const temp = useContext(UserContext)
  backEndUrl = temp.backEndUrl
  return (
    <div></div>
  )
}



const loadLogs = async () => {
  token = localStorage.getItem("wolfpackauthtoken");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    const urlOfHit = backEndUrl + "/api/transactions/list";
    const response = await fetch(urlOfHit, options);
    const res = await response.json();

    if (res) {
      console.log(res);
      return res
    }
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  token = localStorage.getItem("wolfpackauthtoken");
  //if (!token) navigate("/login");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const urlOfHit = backEndUrl + "/api/transactions/getdetails";
    const response = await fetch(urlOfHit, options);
    const res = await response.json();

    if (res) {
        console.log(res);
        return res
    }
  } catch (error) {
    console.log(error);
  }
};

const transferMoney = async (toEmail, amount) => {
  token = localStorage.getItem("wolfpackauthtoken");
  //if (!token) navigate("/login");
  try {
    const dataXD = {
      toEmail,
      amount,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(dataXD),
    };
    const urlOfHit = backEndUrl + "/api/transactions/transfer";
    const response = await fetch(urlOfHit, options);
    const res = await response.json();

    if (res) {
        return res
    }
  } catch (error) {
    console.log(error);
  }
};

const addMoney = async (amount) => {
  token = localStorage.getItem("wolfpackauthtoken");
  //if (!token) navigate("/login");
  try {
    const dataXD = {
      amount,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(dataXD),
    };
    const urlOfHit = backEndUrl + "/api/transactions/addmoney";
    const response = await fetch(urlOfHit, options);
    const res = await response.json();

    if (res) {
        return res
    }
  } catch (error) {
    console.log(error);
  }
};

export default BackendFunctions
export { loadLogs, addMoney, loadData, transferMoney };