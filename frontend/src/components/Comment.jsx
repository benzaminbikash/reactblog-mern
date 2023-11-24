import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
function Comment() {
  return (
    <div className="bg-slate-600 rounded-md p-2 mt-2">
      <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-200">
        <p>@Reshma Ghimire</p>
        <div className="flex items-center gap-5  text-sm text-gray-200">
          <p>2021-2-2</p>
          <div className="flex items-center gap-2  text-sm text-gray-200">
            <MdDelete />
            <MdEdit />
          </div>
        </div>
      </div>
      <p>- You are amazing</p>
    </div>
  );
}

export default Comment;
