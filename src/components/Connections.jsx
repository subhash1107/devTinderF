import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem('token1');
      if(token){
      const res = await axios.get(BASE_URL + "/user/connections", {
        headers:{
          Authorization:`Bearer ${token}`,
      },
        withCredentials: true,
      });
      dispatch(addConnection(res.data.message));}
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
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
          <div key={_id} className="card card-side bg-slate-100 shadow-xl md:max-w-[50%] mx-auto my-4">
            <figure>
              <img
                src={photoUrl}
                alt={firstName+" photo"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName+" "+lastName}</h2>
              {age&&<p>Age: {age}</p>}
              {gender&&<p>{gender}</p>}
              {about&&<p>{about}</p>}

            </div>
          </div>
          
        );
      })}
    </div>
  );
};

export default Connections;
