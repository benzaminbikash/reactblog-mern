import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import { useLoginMutation } from "../redux/Api/UserApi";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [loginApi] = useLoginMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const hanldeRegister = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast("Email and Password is required.");
    } else {
      const response = await loginApi(form);
      if (
        response.error &&
        response.error.data &&
        response.error.data.status === false
      ) {
        toast(response.error.data.message);
      } else {
        localStorage.setItem("auth", response.data.token);
        dispatch(setToken(response.data.token));
        navigate("/");
        toast(response.data.message);
      }
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container mx-auto px-25 md:px-20">
      <h1 className="text-center mt-10 mb-4 text-1xl md:text-2xl font-bold">
        Login to your account
      </h1>
      <form className="w-2/3 md:w-2/5 mx-auto" onSubmit={hanldeRegister}>
        <input
          id="email"
          onChange={(e) => handleChange(e)}
          type="email"
          placeholder="Email"
          className="w-full text-sm p-2 bg-transparent border-red-500 border-b-2 rounded-md  my-2 focus:outline-none"
        />
        <input
          id="password"
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="Password"
          className="w-full text-sm p-2 bg-transparent border-red-500 border-b-2 rounded-md  my-2 focus:outline-none"
        />
        <button className="w-full bg-red-500 p-2 my-2 rounded-md">Login</button>
      </form>
      <div className="gap-2  flex justify-center">
        <p>Have n't account?</p>
        <Link to="/register" className="text-blue-500 underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
