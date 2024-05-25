import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Signup = () => {

    let nameRef= useRef()
    let emailRef= useRef()
    let passwordRef= useRef()

    let navigate = useNavigate()


    const handleSubmit =async()=>{
        let obj ={
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        console.log(obj)

// using axios method
    let res =await axios.post('http://localhost:8080/register',obj)
    console.log(res.data)
      if(res.data.success===true){
            navigate('/')
            toast.success(res.data.msg,{position: "top-center"});
        }
        else{
            toast.error(res.data.msg,{position: "top-center"}); 
        }

        
//  using fetech method
        // let req = await fetch('http://localhost:8080/register',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(obj)
        // })

        // let datas = await req.json();
        // console.log(datas)
        // if(datas.success===true){
        //     navigate('/')
        //     toast.success(datas.msg,{position: "top-center"});
        // }
        // else{
        //     toast.error(datas.msg,{position: "top-center"}); 
        // }
    }
  return (
    <div className='loginPage'>
    <h1>Signup Page</h1>
    <label htmlFor="">Name</label>
    <input ref={nameRef} type="text" />
    <label htmlFor="">Email</label>
    <input ref={emailRef} type="email" />
    <label htmlFor="">Password</label>
    <input ref={passwordRef} type="password" />
     <p>Already a user?  <Link to="/">Login?</Link>   </p>
    <button onClick={handleSubmit}>Submit</button>
</div>
  )
}

export default Signup
