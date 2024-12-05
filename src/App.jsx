import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Testing from "./components/Testing";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import axios from "axios";

const App = () => {
  // const token = localStorage.getItem('token1')
  // if(token){
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
  // }
  // axios.defaults.withCredentials = true;
  return (
    <>
      <Provider store={appStore()}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="/" element={<Body />}>
              <Route path="feed" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="testing" element={<Testing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
