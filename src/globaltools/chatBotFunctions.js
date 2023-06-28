/*
 This file contains functions that convert the json response recieved in 'backendFunctions'
 to text format which can be easily comprehended by the user.
*/

import {loadLogs, addMoney, loadData, transferMoney} from './backendFunctions'

const showBankBalance = async ()=>{
    try {
        let details = await loadData()
        if(details && details.bankBalance){
            const s="Your Bank Balance is Rs. " + details.bankBalance
            console.log(s)
            return s;
        }
        else
            throw new Error("Cannot Fetch the details")
    } catch (error) {
        console.log(error)
        return ("Error Occured")
    }
}

const showDetails = async ()=>{
    try {
        let details = await loadData()
        if(details){
            let s=""
            if(details.name) s+="Name: " + details.name + '\n'
            if(details.email) s+="Email: " + details.email +'\n'
            if(details.bankAccountNumber) s+="Account Number: " + details.bankAccountNumber +"\n"
            if(details.bankBalance) s+="Balance: " + details.bankBalance
            console.log(s)
            return s;
        }
        else
            throw new Error("Cannot Fetch the Details")
    } catch (error) {
        console.log(error)
        return ("Error Occured")
    }
}

const showLogs = async ()=>{
    try {
        let logs = await loadLogs()
        if(logs){
            let arr=[];
            for(let i=0; i<logs.length; i++){
                let x=logs[i]
                let s=""
                s+="Transaction ID: "+ x.transactionId+ "\nFrom: "+ x.fromEmail +"\nTo: "+ x.toEmail+ "\nAmount: "+x.amount+"\nDate: "+x.date.slice(0, 10)+ " "+x.date.slice(11, 19) +"\n"
                arr.push(s)
            }
            for(let i=0; i<arr.length; i++)
                console.log(arr[i])
            return arr
        }
        else
            throw new Error("Cannot Fetch the Details")
    } catch (error) {
        console.log(error)
        return ("Error Occured")
    }
}

const doTransaction = async(toEmail, amount) =>{
    try {
        let tran = await transferMoney(toEmail, amount)
        if(tran && tran.newTransaction.toEmail){
            console.log("Transaction Successful")
            return ("Transaction Successful")
        }
        if(!tran){
            throw new Error("Cannot Perform this Transaction")
        }
    } catch (error) {
        console.log(error)
        return ("Error Occured")
    }
}


export {showBankBalance, showDetails, showLogs, doTransaction}