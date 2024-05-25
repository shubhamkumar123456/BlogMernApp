import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const YourPosts = () => {
  let store = useContext(AuthContext)
  console.log(store.userDetail._id)
  let id = store.userDetail._id

let titleRef = useRef()
let descRef = useRef()
  const [yourposts, setyourposts] = useState([]);

  async function getYourPosts(){
    let res = await fetch(`http://localhost:8080/post/userPosts/${id}`)
    let data = await res.json()
    console.log(data.allpost)
    setyourposts(data.allpost)
    
  }
useEffect(()=>{
  getYourPosts()
},[])

const handleDelete =async(ans)=>{
  console.log(ans)
  let alertAns =window.confirm('are your sure you want to delete this item')
  console.log(alertAns)
 if(alertAns){
   let res = await fetch(`http://localhost:8080/post/delete/${ans._id}`,{
    method:'DELETE'
  })
  let data =await res.json()
  console.log(data)
  
  getYourPosts()
 }
  
}

const [showForm, setshowForm] = useState(false);
const [postId, setpostId] = useState("");

const handlesUBMIT=async(e)=>{
  e.preventDefault();
  let obj={
    title:titleRef.current.value,
    description:descRef.current.value,
  }
  console.log(obj)
  console.log(postId)

  let res = await fetch(`http://localhost:8080/post/update/${postId}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(obj)
  })
  let data = await res.json()
  console.log(data)
setshowForm(false)
getYourPosts()
}

const handleEdit=(ans)=>{
  console.log(ans)
  setpostId(ans._id)
  setshowForm(true)
}

  return (
    <div className='container'>

<div className='row d-flex justify-content-center'>
    {yourposts.map((ele)=>{
      return <div className="card" style={{width: '18rem'}}>
        <MdDeleteOutline onClick={()=>handleDelete(ele)} size={30} color='red' className='deleteIcon' />
        <FaEdit onClick={()=>handleEdit(ele)} className='editIcon'  size={25} color='orange' />
  <img src={ele.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ele.title}</h5>
    <p className="card-text">{ele.description}</p>

  </div>
</div>

    })}
    </div>

{showForm && <div className='col-md-4  p-3 formYourPost'>
<form >
<button onClick={()=>setshowForm(false)}  type="button" className="btn-close bg-white" aria-label="Close"></button>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input ref={titleRef} type="text" className="form-control" id="title" aria-describedby="emailHelp" />
   
  </div>
  <div className="form-floating">
  <textarea ref={descRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label for="floatingTextarea">Description</label>

</div>
 
  <button onClick={handlesUBMIT} type="submit" className="btn btn-primary mt-2">Submit</button>
</form>
</div>}

    </div>
  )
}

export default YourPosts
