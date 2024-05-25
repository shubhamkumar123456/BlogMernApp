import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [image, setimage] = useState("");
  const [clicked, setclicked] = useState(false);

  let store = useContext(AuthContext)
  console.log(store)

  const [posts, setposts] = useState([]);
  console.log(posts)

  async function fetchAllPosts(){
    let res = await fetch('http://localhost:8080/post/allusersPosts')
    let data = await res.json()
    console.log(data.allposts)
    setposts(data.allposts)
  }
  useEffect(()=>{
    fetchAllPosts()
  },[])

  let titleRef = useRef();
  let descriptionRef = useRef();

  const handleFileChange = (e)=>{
    let value = e.target.files[0];
    console.log(value)
    setimage(value)


  }

  function doConvert(img){
    return new Promise((resolve,reject)=>{
      var reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function() {
  
        // console.log(reader.result);
        resolve(reader.result)
    }
    reader.onerror = function(err){
      reject(reader.error);
    }
    })
   
  }

  const handleBlogSUbmit = async(e)=>{
    e.preventDefault();
    let convertImage = image && await doConvert(image)
    console.log(convertImage)
    let obj = {
      title:titleRef.current.value,
      description:descriptionRef.current.value,
      image:convertImage,
     author:store.userDetail._id

    }

    if(obj.title && obj.description && obj.image && obj.author){

      let res = await fetch('http://localhost:8080/post/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      })
  
      let data = await res.json();
      console.log(data)
      fetchAllPosts()
  
  setimage("")
      setclicked(false)
    }
    else{
      alert("please fill all the fields")
    }
    // console.log(obj)

  }


  return (
  <div className="row">
    <div className="col-2  d-flex justify-content-center">
      <Sidebar clicked={clicked} setclicked = {setclicked}/>
    </div>

    <div className="col-10 ">
    <div className='row row-cols-3 d-flex justify-content-center gap-1'>
      {posts.map((ele)=>{
        return <div className="card" style={{width: '16rem'}}>
  <img src={ele.image}  className="card-img-top img-fluid" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ele.title}</h5>
    <h5 className="card-title">Author:{ele.author.name}</h5>
    <Link to="/single" state={ele} className="btn btn-primary">Go somewhere</Link>
  </div>
</div>

      })}
    </div>
    </div>

    <div className="formBox">
    { clicked && <form action="" className='col-md-4'>
    <button onClick={()=>setclicked(false)}  type="button" className="btn-close" aria-label="Close"></button>
          <label htmlFor="">Title</label>
          <input ref={titleRef} type="text" />
          <label htmlFor="file" className='btn btn-primary'>upload Image</label>
          <input onChange={handleFileChange} type="file" id='file' hidden />
        {!image &&  <img src="https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg" alt="" />}
         {image && <img src={URL.createObjectURL(image)} alt="" />}
          <label htmlFor="">desciption</label>
          <textarea ref={descriptionRef} name="" id=""></textarea>
          <button onClick={handleBlogSUbmit} className='btn btn-success'>Post blog</button>
      </form>}
    </div>
  </div>
  )
}

export default Home
