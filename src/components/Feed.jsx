import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store)=>{return store.feed})
    // console.log('Feed array as JSON:', JSON.stringify(feed, null, 2)); 

    
    const feedData = async ()=>{
        try {
            if(feed) return;
            const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true})
            dispatch(addFeed(res.data.message))  
            // console.log(res.data.message);
            
        } catch (err) {
            console.log(err);
            
        }
 
    }
    useEffect(()=>{
        feedData()
    },[])
  return (<>
    <UserCard/>
  </>)
}

export default Feed