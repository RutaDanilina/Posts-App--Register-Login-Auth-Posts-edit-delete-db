import React from 'react'
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { post } from '../plugins/http'

const Navbar = () => {

  const [img, setImg] = React.useState('')


  const getImg = async() => {
    const secret = localStorage.getItem('secret')
    const res = await post('getUser/'+ secret)

    if(!res.error){
      setImg(res.data.img)
    }

    console.log(res)
  }
  getImg()

  return (
    <div className='navbarWrapper'>
        <div><Diversity2Icon sx={{ color: '#c2905f', height:'40px', ml:'20px'}} /></div>
        <div style={{display: 'flex', alignItems:'center', marginRight:'10px' }}>
            <img src={img} alt="" />

        </div>

    </div>
  )
}

export default Navbar
