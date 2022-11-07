import React from 'react'
import {  useNavigate} from 'react-router-dom';
import {post} from "../plugins/http";


import LoginIcon from '@mui/icons-material/Login';

const LoginPage = () => {
    const navigate = useNavigate();

    const emailRef = React.useRef()
    const passwordRef = React.useRef()

    const [msg, setMsg] = React.useState('')

    async function login() {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const data = await post("login", user)

        if(!data.error) {
            localStorage.setItem("secret", data.data.secret)  
            navigate('/profile')      
        } else {
            emailRef.current.value = ''
            passwordRef.current.value = ''
            return setMsg(data.message)
        }
    }

 


  return (
    <div className='loginWrapper'>

        
        <div className='loginHeader'>
            <LoginIcon sx={{ m: 1, p: 1, height: '40px', width: '40px',  border:'1px solid #2C1015', borderRadius: '50%'}} />
            <h3>LOGIN</h3>
        </div>
        <div className='loginFormWrapper'>
            <input ref={emailRef} type="text" placeholder='Email'/>
            <input ref={passwordRef} type="text" placeholder='Password'/>
            <button onClick={login}>Log In</button>
        </div>

        <p style={{ textTransform: 'uppercase', fontSize: '10px', color: 'red'}}>{msg}</p>

        <div className='toRegister'>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>

        

    </div>
  )
}

export default LoginPage