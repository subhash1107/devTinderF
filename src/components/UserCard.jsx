import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { removeFeed } from '../utils/feedSlice'

const UserCard = ({user}) => {
  const dispatch = useDispatch()
  const {_id,firstName, lastName, gender, age, about, photoUrl,skills} =user
  const handleSendRequest = async (status,_id)=>{
     try {
      await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true})
      dispatch(removeFeed(_id))
     } catch (error) {
      console.log(error);
      
     }
  }

  
  return (<>
    <div className="card card-compact bg-base-100 sm:w-96  shadow-xl p-2">
  <figure>
    <img
      src={photoUrl}
      className='h-full'
      alt={firstName + " "+"photo"} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&&gender&&<p>{age+", "+gender}</p>}
    {skills && skills.length > 0 && (
            <p>Skills: {skills.join(', ')}</p>
          )}
    <p className=' break-words'>{about}</p>
    <div className="card-actions justify-center my-5">
      <button
      className="btn btn-primary"
      onClick={()=>handleSendRequest("ignored",_id)}
      >
      Ignore
      </button>
      <button 
      className="btn btn-secondary"
      onClick={()=>handleSendRequest("interested",_id)}
      >
      Interested
      </button>
    </div>
  </div>
</div>
  </>)
}

export default UserCard