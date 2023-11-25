import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../constant/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegistrationMutation } from "../redux/Api/UserApi";
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [registerApi] = useRegistrationMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const hanldeRegister = async (e) => {
    e.preventDefault();
    const response = await registerApi(form);
    if (
      response.error &&
      response.error.data &&
      response.error.data.status === false
    ) {
      toast(response.error.data.message);
    } else {
      toast(response.data.message);
      navigate("/login");
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
      <h1 className="text-center mt-10 mb-4 text-2xl font-bold">
        Create an account
      </h1>
      <form className="w-2/5 mx-auto" onSubmit={hanldeRegister}>
        <input
          onChange={(e) => handleChange(e)}
          id="username"
          type="text"
          placeholder="Username"
          className="w-full text-sm p-2 bg-transparent border-red-500 border-b-2  rounded-md  my-2 focus:outline-none"
        />
        <input
          onChange={(e) => handleChange(e)}
          id="email"
          type="email"
          placeholder="Email"
          className="w-full text-sm p-2 bg-transparent border-red-500 border-b-2 rounded-md  my-2 focus:outline-none"
        />
        <input
          onChange={(e) => handleChange(e)}
          type="password"
          id="password"
          placeholder="Password"
          className="w-full text-sm p-2 bg-transparent border-red-500 border-b-2 rounded-md  my-2 focus:outline-none"
        />
        <button className="w-full bg-red-500 p-2 my-2 rounded-md">
          Sign Up
        </button>
      </form>
      <div className="gap-2  flex justify-center">
        <p>Have an account?</p>
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
      <ToastContainer limit={1} hideProgressBar={true} />
    </div>
  );
}

export default Register;
