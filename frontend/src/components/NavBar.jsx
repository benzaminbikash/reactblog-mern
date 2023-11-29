import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";

function NavBar() {
  const state = useSelector((state) => state.token);
  const authentication = state?.token;
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-black shadow-sm shadow-red-500 py-3">
      {/* left */}
      <div className="container mx-auto  px-20 flex justify-between items-center">
        <Link to="/" className="text-1xl md:text-2xl font-medium">
          Blog <span className="text-red-500">Mern</span>
        </Link>
        {/* middle */}
        <div className="flex items-center px-3 py-1 rounded-md">
          <input
            type="text"
            placeholder="search here"
            className=" focus:outline-none bg-transparent text-white w-24 md:w-64"
          />
          <FaSearch color="white" />
        </div>
        {/* right */}
        <div className="flex gap-4 cursor-pointer items-center">
          {authentication ? (
            <>
              <Link to="/createblog" className="hidden md:inline">
                Write
              </Link>
              <div>
                <IoMdMenu color="white" onClick={() => setOpen(!open)} />
                {/* for Mobile */}
                {open && <MobileMenu setOpen={setOpen} />}
              </div>
            </>
          ) : (
            <>
              <Link to="/register" className="hidden md:inline">
                Register
              </Link>
              <Link to="/login" className=" md:inline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
