import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { setLoading } from "../utils/loadingSlice";
import Loading from "./Loading";
import handleClearCache from "../utils/handleClearCache";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const isLoading = useSelector((store)=>store.loading.isLoading)
  const location = useLocation();

  const getUser = async () => {
    try {
      if (userData || location.pathname==="/login") return;
      dispatch(setLoading(true))
      const user = await axios.get(BASE_URL + "/profile/view",);
      dispatch(addUser(user.data));
    } catch (err) {
      if (err.status) {
        navigate("/login");
      }
      console.log(err);
    } finally {
      dispatch(setLoading(false))
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if(isLoading) return <Loading/>
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Body;
