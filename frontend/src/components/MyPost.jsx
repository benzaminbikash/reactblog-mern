import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useDeletePostMutation, useMyPostQuery } from "../redux/Api/PostApi";
import { toast } from "react-toastify";
import CustomModal from "./CustomModal";
import { formatTimeDifference } from "../constant/constant";

function MyPost({ blog }) {
  const formattedTime = formatTimeDifference(blog?.createdAt);
  const [deleteApi] = useDeletePostMutation();
  const { refetch: allMyPostApi } = useMyPostQuery();
  const deleteHandleing = async (id) => {
    const response = await deleteApi(id);
    toast(response.data.message);
    await allMyPostApi();
  };
  // for custom modal:
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
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
          {/* title */}
          <div className="flex justify-between">
            <h1 className="text-sm md:text-2xl font-bold mt-5 md:mt-0">
              {blog.title}
            </h1>
            {/* operation */}
            <div className="flex  mr-5 mt-5 md:mt-0 gap-3">
              <MdModeEditOutline onClick={() => handleOpen()} />
              <MdDelete color="red" onClick={() => deleteHandleing(blog._id)} />
            </div>
          </div>
          <div className="flex justify-between py-1">
            <p className="text-gray-500">{formattedTime}</p>
          </div>
          <p className="text-sm">
            {" "}
            {blog.description.length > 300
              ? blog.description.substring(0, 300) + "..."
              : blog.description}
          </p>
        </div>
      </div>
      {open && <CustomModal close={handleOpen} blogitem={blog} />}
    </>
  );
}

export default MyPost;
