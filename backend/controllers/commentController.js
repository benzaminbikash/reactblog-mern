const Commet = require("../models/Commet");
const { asyncHandler } = require("../utils/asyncHandler");

const commentCreate = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { comment, postId } = req.body;
  const comments = await Commet.create({
    comment: comment,
    postId: postId,
    userId: _id,
  });
  res.status(200).json({
    status: true,
    message: "Comment Create Successfully!",
    comment: comments,
  });
});

const getProductComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comments = await Commet.find({ postId: id })
    .populate("userId")
    .select("-password");
  res.status(200).json({
    status: true,
    message: "Product Comments",
    comments: comments,
  });
});

const deleteComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Commet.findByIdAndDelete(id);
  res.status(200).json({
    status: true,
    message: "Comment Delete",
    comment,
  });
});

const updateComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Commet.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    status: true,
    message: "Comment Update",
    comment,
  });
});

module.exports = {
  commentCreate,
  getProductComments,
  deleteComments,
  updateComments,
};
