import React from 'react'
import { useLocation } from 'react-router-dom'

const SinglePost = () => {

    let location = useLocation()
    console.log(location)
  return (
    <div>
        <p>{location.state.title}</p>
        <img src={location.state.image} alt="" />
        <p>{location.state.author.name}</p>
        <p>{location.state.description}</p>
     
    </div>
  )
}

export default SinglePost
