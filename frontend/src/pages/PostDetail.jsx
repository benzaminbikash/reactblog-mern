import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Comment from "../components/Comment";

function PostDetail() {
  return (
    <div className="container mx-auto px-20 py-2">
      {/* title */}
      <div className="flex justify-between items-center py-3">
        <h1 className="text-2xl font-bold">Artifical Inteligence</h1>
        <div className="flex gap-4">
          <MdDelete />
          <MdEdit />
        </div>
      </div>
      {/* user info */}
      <div className=" flex justify-between text-gray-500">
        <p>Reshma Ghimire</p>
        <p>2021-23-11</p>
      </div>
      {/* image */}
      <img
        className="py-3 h-[500px] object-cover w-full"
        src="https://chatai.com/wp-content/uploads/2023/11/tr71123-ai-art.jpeg"
        alt="/"
      />
      <p className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga modi
        dolorem, pariatur rem itaque optio quaerat facilis voluptatem iusto
        iure, dolor dolores debitis eligendi doloremque possimus? Fugiat
        necessitatibus recusandae optio, vitae quo voluptatum incidunt eveniet
        nostrum. Repudiandae amet illo accusantium, cumque odit adipisci iste,
        doloremque tenetur voluptate reprehenderit ipsam! Laborum.
      </p>
      {/* categories */}
      <div className="pt-4 flex-col  sm:flex-row flex gap-4 items-center font-bold">
        <p>Categories:</p>
        <p className="bg-slate-400 px-5 text-sm py-1 rounded-full uppercase">
          Tech
        </p>
        <p className="bg-slate-400 px-5 text-sm py-1 rounded-full uppercase">
          Ai
        </p>
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
  );
}

export default PostDetail;
