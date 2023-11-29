import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../redux/tokenSlice";

function MobileMenu({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    navigate("/login");
    localStorage.removeItem("auth");
    dispatch(setToken(""));
    setOpen();
  };

  return (
    <div className="z-20 flex flex-col font-semibold  px-3 py-2 w-32 bg-red-500 absolute right-4 md:right-32 top-12 rounded-md ">
      <Link to="/profile" onClick={() => setOpen()}>
        Profile
      </Link>
      <hr />
      <Link to="/createblog" onClick={() => setOpen()}>
        Write
      </Link>
      <hr />
      <button onClick={logoutUser} className="text-start">
        Logout
      </button>
      <hr />
    </div>
  );
}

export default MobileMenu;
