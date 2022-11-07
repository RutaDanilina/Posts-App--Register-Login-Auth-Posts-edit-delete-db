import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { get, post } from '../plugins/http'

const PostCard = ({post: item, postRemoved}) => {

  const editRef = React.useRef()

  const [showReply, setShowReply] = React.useState(false)


  const remove = async() => {
    const res= await get('delete/' + item._id)
    postRemoved(item._id)
    console.log(res)

  }

  const edit = async() => {
    const val = editRef.current.value
    const res = await post('update', {title: val , id: item._id})
    console.log(res)
  }


  return (
    <div className='singleCard'>
      <h3>{item.title}   <button onClick={() => setShowReply(!showReply)}><EditIcon sx={{ color: '#39250C', height:'15px',  ':hover': {color: '#c2905f', transition: 'ease-in .5s', scale: '1.1'}}} /></button> </h3>
      
      { showReply && <div style={{ display: 'flex', marginBottom: '10px'}}>
        <input ref={editRef} type="text" placeholder='Change title' style={{width:'90%'}}/>
        <button style={{width:'10%'}} onClick={edit}><DoneIcon sx={{ color: '#39250C', height:'15px',  ':hover': {color: '#c2905f', transition: 'ease-in .5s', scale: '1.1'}}} /></button>
      </div>}
      

      <img src={item.img} alt="" />
      <h4>{item.username}</h4>
      <p>{item.description}</p>

      <div className='btnWrapper'>
       
        
          <button onClick={remove}><DeleteIcon sx={{ color: '#39250C', height:'18px', ':hover': {color: '#c2905f', transition: 'ease-in .5s', scale: '1.1'}}} /></button>
      </div>
    

    </div>
  )
}

export default PostCard