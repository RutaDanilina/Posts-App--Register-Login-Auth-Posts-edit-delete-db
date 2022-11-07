import React from 'react'
import { post } from '../plugins/http'
import {  useNavigate} from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';

import PostForm from './PostForm'

const UserCard = () => {

  const navigate = useNavigate();


  const [img, setImg] = React.useState('')
  const [username,setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [description, setDescription] = React.useState('')



  

  const getUser = async() => {
    const secret = localStorage.getItem('secret')
    const res = await post('getUser/'+ secret)

    if(!res.error){
      setUsername(res.data.username)
      setEmail(res.data.email)
      setImg(res.data.img)
      setDescription(res.data.description)
    }
    console.log(res)
  }
  getUser()

  
  return (
    <div className='userCardWrapper'>
        <div>
            <img src={img} alt="" />
        </div>
        <div className='descriptionWrapper'>
            <p><b>Email:</b> {email} </p>
            <p><b>Username: </b>{username} </p>
            <p><b>description:</b> {description} </p>

            <button onClick={() => navigate('/')} style={{backgroundColor:'transparent', border:'none', textAlign:'left'}}>
                <LogoutIcon sx={{ color: '#39250C', height:'18px', ':hover': {color:'#c2905f', scale:'1.1', transition:'ease-in .5s'}}} /> 
            </button>

        </div>
      
          <PostForm />
        
    </div>
  )
}

export default UserCard