import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user)
  
  const getUser = async ()=>{
    try {
      if(userData) return;
      const user = await axios.get(BASE_URL + "/profile/view",{withCredentials:true});
      dispatch(addUser(user.data))       
    } catch (err) {
      if(err.status){
        navigate("/login")
      }
      console.log(err);
      
    }
  }
  useEffect(()=>{
    getUser();
  },[])
  return (
    <div className=" relative h-[100%]">
      <Navbar />
      <Outlet />
      <Footer className='absolute bottom-0' />
    </div>
  );
};

export default Body;
