import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Login = () => {

  let store = useContext(AuthContext);
  console.log(store)

  let navigate = useNavigate()

  let emailRef = useRef();
  let passwordRef = useRef();

const handleLogin = async(e)=>{
  e.preventDefault();
  let obj={
    email:emailRef.current.value,
    password:passwordRef.current.value
  }
  console.log(obj)
  let res = await axios.post('http://localhost:8080/backendApiLogin',obj)
  console.log(res.data);
  if(res.data.success){
    localStorage.setItem('userDetails',JSON.stringify(res.data.userDetails))
    store.setuserDetail({
      name:res.data.userDetails.name,
      _id:res.data.userDetails._id,
      login:true
    })
    navigate('/')
    toast.success(res.data.msg,{position:"top-center"})
  }
  else{
    toast.error(res.data.msg,{position:"top-center"})
  }

}
  
  return (
    <form onSubmit={handleLogin} className='loginPage'>
        <h1>Login Page</h1>
    
        <label htmlFor="">Email</label>
        <input ref={emailRef} type="email" />
        <label htmlFor="">Password</label>
        <input ref={passwordRef} type="password" />
         <p>Not a user?  <Link to="/register">Signup?</Link>   </p>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Login
