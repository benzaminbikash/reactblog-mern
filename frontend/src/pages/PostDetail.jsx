import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import {
  useAddCommentMutation,
  useAllProductCommentsQuery,
  useUpdateCommentMutation,
} from "../redux/Api/CommentApi";
import { useMyDataQuery } from "../redux/Api/UserApi";
import { toast } from "react-toastify";
function PostDetail() {
  const state = useSelector((state) => state.token);
  const location = useLocation();
  const item = location.state;
  // time
  const timeDifferenceInHours = moment().diff(moment(item?.createdAt), "hours");
  const timeDifferenceInMinutes = moment().diff(
    moment(item?.createdAt),
    "minute"
  );
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  // for modal
  const [display, setDisplay] = useState(false);
  const updateDisplayx = () => {
    setDisplay(!display);
  };
  // api
  const { data: userApi } = useMyDataQuery(state?.token);
  const { data: commentFetch, refetch: commentRefetch } =
    useAllProductCommentsQuery(item._id);
  const [addComment] = useAddCommentMutation();
  // for add comment:
  const [comment, setComment] = useState("");
  const addCommentHandle = async () => {
    if (userApi != null) {
      if (!comment) {
        alert("Your comment is empty!");
      } else {
        await addComment({
          postId: item._id,
          comment: comment,
          userId: userApi.user._id,
        });
        await commentRefetch();
        setComment("");
      }
    } else {
      alert("Please Login!");
    }
  };
  // for update comment:
  const [select, setSelect] = useState();
  console.log("select", select);
  useEffect(() => {
    if (select != null) {
      setComment(select.comment);
    }
  }, [select]);
  const updateHandle = async () => {
    console.log("comment", comment);
    try {
      const response = await fetch(
        `http://localhost:8000/api/comment/update/${select._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + state?.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );
      const result = await response.json();
      await commentRefetch();
      setSelect();
      setComment("");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mx-auto px-20 py-2">
        {/* title */}
        <div className="flex justify-between items-center py-3">
          <h1 className="text-2xl font-bold">{item?.title}</h1>
        </div>
        {/* user name */}
        <div className=" flex justify-between text-gray-500">
          <p>@{item?.postbyuser.username}</p>
          <p>
            {timeDifferenceInHours > 0
              ? `${timeDifferenceInHours} hrs ago`
              : `${timeDifferenceInMinutes} mins ago`}
          </p>
        </div>
        {/*  image */}
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
          {commentFetch?.comments == 0 ? (
            <>
              <h1 className="text-white mt-4">No comment here add comment!</h1>
            </>
          ) : (
            <>
              {commentFetch?.comments.map((item, index) => {
                return (
                  <Comment
                    comments={item}
                    key={index}
                    userApi={userApi?.user}
                    commentRefetch={commentRefetch}
                    select={select}
                    setSelect={setSelect}
                  />
                );
              })}
            </>
          )}
        </div>

        {/* Write comment */}
        <div className="my-6  flex  flex-col md:flex-row justify-between">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className="md:w-[72%] bg-transparent border-b-1 border-red-500 px-2 focus:outline-none"
          />
          {/* when select */}
          {select ? (
            <div className=" flex flex-col md:flex-row gap-3 md:w-[25%] transition-all duration-200">
              {/* cancel */}
              <button
                onClick={() => {
                  setSelect();
                  setComment("");
                }}
                className="my-4  md:w-[50%] bg-red-500 p-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateHandle}
                className="md:my-4  md:w-[100%] bg-red-500 p-2 rounded-md"
              >
                Update Comment
              </button>
            </div>
          ) : (
            <button
              onClick={addCommentHandle}
              className="my-4  md:w-[25%] bg-red-500 p-2 rounded-md"
            >
              Add Comment
            </button>
          )}
        </div>
      </div>
      {display && <CustomModal close={updateDisplayx} blogitem={item} />}
    </>
  );
}

export default PostDetail;
