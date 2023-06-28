
import { Link, useNavigate} from "react-router-dom"
import "./css.css" 
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../globaltools/GlobalFunctionsAndVars"

let backEndUrl='http://localhost:3000'

function Login(){
    const navigate = useNavigate()
    const temp = useContext(UserContext)
    backEndUrl = temp.backEndUrl
    const [err, setErr] = useState(false)  
    const signInWithIdPwd = async (email, password) =>{
        const data={
            email: email,
            pwd: password
        }
        const options={ //configure req
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(backEndUrl+"/api/auth/login", options)
        const res= await response.json()
        const auth_token=res['auth-token']
            if(auth_token){
                //Save the auth token and redirect on the other site
                console.log("authentication successful")
                localStorage.setItem('wolfpackauthtoken', auth_token);
                localStorage.setItem('wolfpackusername', res.name);
                localStorage.setItem('wolfpackemail', email); //Will remove this later
                navigate('/')
            }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()  // stop refreshing the page
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithIdPwd(email, password)  
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
                    <input type="password" placeholder="Enter password" />
                    <button className="Signup-btn">Login</button>
                    {err && <span>Something went Wrong</span>}
                    <p className="DirToLoginsignup" >Don't have Account ? <Link style={{cursor:"pointer"}} to="/register">Signup</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login;