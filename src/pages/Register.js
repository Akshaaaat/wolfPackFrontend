
import { Link, useNavigate } from "react-router-dom"
import "./css.css" 
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../globaltools/GlobalFunctionsAndVars"

let backEndUrl='http://localhost:3000'

function Login(){
    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const temp = useContext(UserContext)
    backEndUrl = temp.backEndUrl
    const signInWithIdPwd = async (email, name, password) =>{
        const data={
            email: email,
            name:name,
            pwd: password
        }
        const options={ //configure req
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(backEndUrl+"/api/auth/createuser", options)
        const res= await response.json()
        const auth_token=res['auth-token']
            if(auth_token){
                //Save the auth token and redirect on the other site
                console.log("authentication successful")
                localStorage.setItem('wolfpackauthtoken', auth_token);
                localStorage.setItem('wolfpackemail', email);
                localStorage.setItem('wolfpackusername', res.name);
                navigate('/')
            }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()  // stop refreshing the page
        const email = e.target[0].value
        const name = e.target[1].value
        const password = e.target[2].value

        try {
            await signInWithIdPwd(email, name, password)  
            } catch (err) {
            console.log(err)
            setErr(true)
        }
    }


    useEffect(()=>{
        const token =localStorage.getItem('wolfpackauthtoken');
        if(token)
            navigate('/')
    }, )

    return (
        <div className="Register-page">
            <div className="Regsiter-box">
                <div className="appName">WolfPack</div>
                <div className="page-type">Login</div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter your Email" />
                    <input type="name" placeholder="Enter your Name" />
                    <input type="password" placeholder="Enter password" />
                    <button className="Signup-btn">Login</button>
                    {err && <span>Something went Wrong</span>}
                    <p className="DirToLoginsignup" >Already Registered ? <Link style={{cursor:"pointer"}} to="/login">Login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login;