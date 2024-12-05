import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import Loading from './Loading'
import { setLoading } from '../utils/loadingSlice'
import handleClearCache from '../utils/handleClearCache'

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store)=>{return store.feed})
    const isLoading = useSelector((store)=>store.loading.isLoading)
    // console.log('Feed array as JSON:', JSON.stringify(feed, null, 2));     

    const feedData = async ()=>{
        dispatch(setLoading(true))
        try {
            if(feed) return;
            handleClearCache();
            const res = await axios.get(BASE_URL + "/user/feed",)
            dispatch(addFeed(res.data.message)); 
        } catch (err) {
            console.log(err);
        } finally{
            dispatch(setLoading(false));                                             

        }
    }
     
    useEffect(() => {    
          feedData();
      }, [feed]); // Empty array means this runs once when the component mounts
      
    if(isLoading) return <Loading/>
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
  <div className='flex justify-center p-5 bg-base-100'>
    {feed&&<UserCard user = {feed[0]}/>}
    </div>
    </>)}

export default Feed