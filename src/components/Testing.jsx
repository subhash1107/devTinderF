import React from 'react'
import { useSelector } from 'react-redux'

const Testing = () => {
    const user = useSelector((store)=>store.user)
    user&&console.log(user);
    
  return (
    <div>Testing</div>
  )
}

export default Testing