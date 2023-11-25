import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
function HomePost({ blogs }) {
  const timeDifferenceInHours = moment().diff(moment(blogs.createdAt), "hours");
  const timeDifferenceInMinutes = moment().diff(
    moment(blogs.createdAt),
    "minute"
  );

  return (
    <div className="mt-10 flex flex-col md:flex-row  md:gap-7  px-20 md:px-0">
      {/* left */}
      <div className="md:w-1/3 md:h-[200px] ">
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
        <h1 className="text-2xl font-bold mt-5 md:mt-0">{blogs.title}</h1>
        <div className="flex justify-between py-1">
          <p className="text-gray-500">@{blogs.postbyuser.username}</p>
          <p className="text-gray-500">
            {timeDifferenceInHours > 0
              ? `${timeDifferenceInHours} hrs ago`
              : `${timeDifferenceInMinutes} mins ago`}
          </p>
        </div>
        <p className="text-sm">{blogs.description}</p>
      </div>
    </div>
  );
}

export default HomePost;
