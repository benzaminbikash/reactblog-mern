import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Comment from "../components/Comment";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useMyDataQuery } from "../redux/Api/UserApi";
import CustomModal from "../components/CustomModal";
import { useAllPostQuery, useDeletePostMutation } from "../redux/Api/PostApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PostDetail() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.token);
  const location = useLocation();
  const item = location.state;
  // api
  const { data: UserData } = useMyDataQuery(state?.token);
  const { refetch: refetchAllPost } = useAllPostQuery();
  // time
  const timeDifferenceInHours = moment().diff(moment(item?.createdAt), "hours");
  const timeDifferenceInMinutes = moment().diff(
    moment(item?.createdAt),
    "minute"
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // for modal
  const [display, setDisplay] = useState(false);
  const updateDisplayx = () => {
    setDisplay(!display);
  };
  // for delete:
  const [deletePost] = useDeletePostMutation();
  const handleDeletePost = async (id) => {
    const response = await deletePost(id);
    console.log(response);
    if (
      response.error &&
      response.error.data &&
      response.error.data.status === false
    ) {
      toast(response.error.data.message);
    } else {
      toast("Delete Successfully");
      navigate("/");
      await refetchAllPost();
    }
  };
  return (
    <>
      <div className="container mx-auto px-20 py-2">
        {/* title */}
        <div className="flex justify-between items-center py-3">
          <h1 className="text-2xl font-bold">{item?.title}</h1>
          {UserData?.user._id == item?.postbyuser._id && (
            <div className="flex gap-4">
              <MdDelete onClick={() => handleDeletePost(item?._id)} />
              <MdEdit onClick={() => updateDisplayx()} />
            </div>
          )}
        </div>
        {/* user info */}
        <div className=" flex justify-between text-gray-500">
          <p>@{item?.postbyuser.username}</p>
          <p>
            {timeDifferenceInHours > 0
              ? `${timeDifferenceInHours} hrs ago`
              : `${timeDifferenceInMinutes} mins ago`}
          </p>
        </div>
        {/* image */}
        <img
          className="py-3 h-[500px] object-cover w-full"
          src={`http://localhost:8000/postimage/${item?.image}`}
          alt="/"
        />
        <p className="text-sm">{item?.description}</p>
        {/* categories */}
        <div className="pt-4 flex-col  sm:flex-row flex gap-4 items-center font-bold">
          <p>Categories:</p>
          {item?.categories.map((item, index) => {
            return (
              <p
                key={index}
                className="bg-slate-400 px-5 text-sm py-1 rounded-full uppercase"
              >
                {item}
              </p>
            );
          })}
        </div>
        {/* comments */}
        <div className="mt-6">
          <p className="font-bold">Comments:</p>
          <Comment />
          <Comment />
          <Comment />
        </div>

        {/* Write comment */}
        <div className="my-6  flex  flex-col md:flex-row justify-between">
          <input
            type="text"
            placeholder="Write a comment"
            className="md:w-[72%] bg-transparent border-b-1 border-red-500 px-2 focus:outline-none"
          />
          <button className="my-4  md:w-[25%] bg-red-500 p-2 rounded-md">
            Add Comment
          </button>
        </div>
      </div>
      {display && <CustomModal close={updateDisplayx} blogitem={item} />}
      <ToastContainer limit={1} hideProgressBar={true} autoClose={500} />
    </>
  );
}

export default PostDetail;
