import axios from 'axios'
import React, { useEffect } from 'react'
import {  BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store)=>{return store.feed})
    // console.log('Feed array as JSON:', JSON.stringify(feed, null, 2));     
    const feedData = async ()=>{
        try {
            const token = localStorage.getItem('token1');
            // const token = Cookies.get("token")
            if(feed) return;
            if(token){
                const res = await axios.get(BASE_URL + "/user/feed",{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                    withCredentials:true})
                dispatch(addFeed(res.data.message));  
            }else{
                return "there is no token"
            }
            
        } catch (err) {
            console.log(err);
            
        }
        
    }
     
    useEffect(() => {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token1');
        if (token) {
          // If a token is found, attempt to fetch user data or feed
          feedData();
        }
      }, []); // Empty array means this runs once when the component mounts
      

    if(!feed) return;
    if(feed.length===0){
        return(<>
                    <div className="toast toast-center toast-middle">
          <div className="alert alert-info">
            <span>No user found in you feed!!</span>
          </div>
        </div>
        </>)
    }

  return (<>
  <div className='flex justify-center p-5 bg-slate-50'>
    {feed&&<UserCard user = {feed[0]}/>}
    </div>
    </>)}

export default Feed