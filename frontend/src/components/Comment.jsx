import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import { useDeleteCommentMutation } from "../redux/Api/CommentApi";

function Comment({ comments, userApi, commentRefetch, setSelect, select }) {
  // time
  const timeDifferenceInHours = moment().diff(
    moment(comments?.createdAt),
    "hours"
  );
  const timeDifferenceInMinutes = moment().diff(
    moment(comments?.createdAt),
    "minute"
  );
  // api
  const [deleteApi] = useDeleteCommentMutation();
  const hanldeDelete = async () => {
    await deleteApi(comments._id);
    await commentRefetch();
  };
  const checkSelect = (d) => {
    setSelect(d);
  };

  return (
    <div className="bg-slate-600 rounded-md p-2 mt-2">
      <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-200">
        <p>@{comments.userId.username}</p>
        <div className="flex items-center gap-5  text-sm text-gray-200">
          <p>
            {timeDifferenceInHours > 0
              ? `${timeDifferenceInHours} hrs ago`
              : `${timeDifferenceInMinutes} mins ago`}
          </p>
          <div className="flex items-center gap-2  text-sm text-gray-200">
            {userApi?._id === comments?.userId._id && (
              <>
                <MdEdit onClick={() => checkSelect(comments)} />
                <MdDelete onClick={hanldeDelete} />
              </>
            )}
          </div>
        </div>
      </div>
      <p>- {comments.comment}</p>
    </div>
  );
}

export default Comment;
