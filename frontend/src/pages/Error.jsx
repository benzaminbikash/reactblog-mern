import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container mx-auto px-25 md:px-20 ">
      <div className="flex flex-col items-center">
        <p className="text-4xl py-5 font-bold uppercase">404 Page Not Found</p>
        <Link
          to="/"
          className="bg-red-500 px-6 py-2 rounded-full shadow-2xl shadow-white"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}

export default Error;
