import React from "react";
import { Link } from "react-router-dom";

import { formatTimeDifference } from "../constant/constant";

function HomePost({ blogs }) {
  const formattedTime = formatTimeDifference(blogs.createdAt);

  return (
    <div className="mt-10 flex flex-col md:flex-row  md:gap-7   md:px-0">
      {/* left */}
      <div className="md:w-1/3   md:h-[200px] ">
        <Link to={`/post/${blogs._id}`} state={blogs}>
          <img
            className="w-full h-full object-cover mx-auto hover:scale-105 duration-700 transition-all "
            src={`http://localhost:8000/postimage/${blogs.image}`}
            alt="/"
          />
        </Link>
      </div>
      {/* right */}
      <div className="md:w-2/3">
        <h1 className="text-sm  md:text-2xl  font-bold mt-5 md:mt-0">
          {blogs.title}
        </h1>
        <div className="flex justify-between py-1">
          <p className="text-gray-500">@{blogs.postbyuser.username}</p>
          <p className="text-gray-500">
            {/* {timeDifferenceInHours > 0
              ? `${timeDifferenceInHours} hrs ago`
              : `${timeDifferenceInMinutes} mins ago`} */}
            {formattedTime}
          </p>
        </div>
        <p className="text-sm">
          {blogs.description.length > 600
            ? blogs.description.substring(0, 600) + "..."
            : blogs.description}
        </p>
      </div>
    </div>
  );
}

export default HomePost;
