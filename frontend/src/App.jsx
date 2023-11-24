import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/tokenSlice";
import Error from "./pages/Error";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = localStorage.getItem("auth");
    dispatch(setToken(getToken));
  }, []);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="" element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/createblog" element={<CreatePost />} />
            <Route path="/editpost" element={<EditPost />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
