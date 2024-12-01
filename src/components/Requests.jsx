import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const foundRequests = useSelector((store) => store.requests);
  const token = localStorage.getItem('token1');

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests", {
      headers:{
        Authorization:`Bearer ${token}`,
    },
      withCredentials: true,
    });
    dispatch(addRequest(res.data));
    // console.log(res.data);
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  
  const handleRequest = async (status,_id)=>{
   
    if(token){
     await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
      headers:{
        Authorization:`Bearer ${token}`,
    },
    withCredentials:true})
     dispatch(removeRequest(_id))
  }}

  if (!foundRequests) return;
  if (foundRequests.length === 0) {
    return (
      <>
        <div className="toast toast-center toast-middle">
          <div className="alert alert-info">
            <span>No Request found!!</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className=" ">
      <h2 className="text-3xl font-bold my-6 text-center ">Requests</h2>
      {foundRequests.map((request) => {
        const { _id } = request;
        const { firstName, lastName, age, about, gender, photoUrl } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="card card-side bg-slate-100 shadow-xl md:max-w-[50%] mx-auto my-4"
          >
            <figure>
              <img src={photoUrl} alt={firstName + " photo"} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && <p>Age: {age}</p>}
              {gender && <p>{gender}</p>}
              {about && <p>{about}</p>}
              <div className="card-actions justify-end">
                <button 
                className="btn btn-circle btn-outline text-red-500"
                onClick={()=>{handleRequest("rejected",_id)}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button 
                className="btn btn-circle btn-outline text-green-500"
                onClick={()=>{handleRequest("accepted",_id)}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
