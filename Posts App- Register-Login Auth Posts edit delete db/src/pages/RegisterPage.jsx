import React from 'react'
import {  useNavigate} from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {post} from "../plugins/http";



const RegisterPage = () => {
    const navigate = useNavigate();

    const emailRef = React.useRef()
    const usernameRef = React.useRef()
    const imgRef = React.useRef()
    const descriptionRef = React.useRef()
    const passwordOneRef = React.useRef()
    const passwordTwoRef = React.useRef()

    async function register() {
        const user = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            img: imgRef.current.value,
            description: descriptionRef.current.value,
            passOne: passwordOneRef.current.value,
            passTwo: passwordTwoRef.current.value
        }

        const data = await post('register', user)

        if(data.error === true) {
            return alert(data.message)
        } else {
            navigate('/')
        }
    }

    return (
      <div className='registerWrapper'>
          
          <div className='loginHeader'>
              <LockOpenIcon sx={{ m: 1, p: 1, height: '40px', width: '40px',  border:'1px solid #2C1015', borderRadius: '50%'}} />
              <h3>REGISTER</h3>
          </div>
          <div className='loginFormWrapper'>
              <input ref={emailRef} type="text" name='email' placeholder='Email'/>
              <input ref={usernameRef} type="text" name='username' placeholder='Username'/>
              <input ref={descriptionRef} type="text" name='description' placeholder='About you'/>

              <input ref={imgRef} type="text" name="img" id="img" placeholder='Photo' />
              <input ref={passwordOneRef} autoComplete="off" type="text" name='password' placeholder='Password'/>
              <input ref={passwordTwoRef} autoComplete="off" type="text" name='password' placeholder='Repeat Password'/>

              <button onClick={register}>Register</button>
          </div>
  
          <div className='toLogin'>
              <button onClick={() => navigate('/')}>Login</button>
          </div>
  
      </div>
    )
}

export default RegisterPage