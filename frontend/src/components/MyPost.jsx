import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

function MyPost({ blog }) {
  const timeDifferenceInHours = moment().diff(moment(blog.createdAt), "hours");
  const timeDifferenceInMinutes = moment().diff(
    moment(blog.createdAt),
    "minute"
  );
  return (
    <div className="mt-10 flex flex-col md:flex-row  md:gap-7">
      {/* left */}
      <div className="md:w-1/3 md:h-[170px]">
        <Link to={`/post/${blog._id}`} state={blog}>
          <img
            className="w-full h-full object-fill mx-auto hover:scale-105 duration-700 transition-all "
            src={`http://localhost:8000/postimage/${blog.image}`}
            alt="/"
          />
        </Link>
      </div>
      {/* right */}
      <div className="md:w-2/3">
        <h1 className="text-sm md:text-2xl font-bold mt-5 md:mt-0">
          {blog.title}
        </h1>
        <div className="flex justify-between py-1">
          <p className="text-gray-500">
            {timeDifferenceInHours > 0
              ? `${timeDifferenceInHours} hrs ago`
              : `${timeDifferenceInMinutes} mins ago`}
          </p>
        </div>
        <p className="text-sm">{blog.description}</p>
      </div>
    </div>
  );
}

export default MyPost;
