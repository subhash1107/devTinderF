import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { setLoading } from "../utils/loadingSlice";
import Loading from "./Loading";


const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const isLoading = useSelector((store)=>store.loading.isLoading)
  

  const fetchConnections = async () => {
    try {
      if(isLoading)return
      dispatch(setLoading(true)); 
      const res = await axios.get(BASE_URL + "/user/connections");
      dispatch(addConnection(res.data.message)); 
    } catch (error) {
      console.log(error); 
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  
  useEffect(() => {
    fetchConnections();
  }, []); 
  
  if (isLoading) return <Loading />;
  
  if (!connections) return;
  if (connections.length <= 0) {
    return (
      <>
        <div className="toast toast-center toast-middle">
          <div className="alert alert-info">
            <span>No Connections found!!.</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className=" ">
    <h2 className="text-3xl font-bold my-6 text-center ">Connections</h2>
      {connections.map((connection) => {
        const{_id,firstName, lastName, age, about, gender, photoUrl} =connection;
        return (
          <div 
          key={_id} 
          className="card card-side bg-base-200 shadow-xl md:max-w-[50%] mx-auto my-4">
            <figure className="md:w-[40%] sm:w-[30%] w-[25%] ">
              <img
                src={photoUrl}
                alt={firstName+" photo"}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName+" "+lastName}</h2>
              {age&&<p className="sm:block hidden">Age: {age}</p>}
              {gender&&<p className="sm:block hidden">{gender}</p>}
              {about&&<p className="sm:block hidden">{about}</p>}

            </div>
          </div>
          
        );
      })}
    </div>
  );
};

export default Connections;
