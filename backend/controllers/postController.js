const Post = require("../models/Post");
const { asyncHandler } = require("../utils/asyncHandler");

const createPost = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const image = req.file.filename;
  console.log(image);
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    image: image,
    categories: req.body.categories,
    postbyuser: _id,
  });
  res.status(200).json({
    status: true,
    message: "Post Create Successfully",
    post: post,
  });
});

const allPostGet = asyncHandler(async (req, res) => {
  const post = await Post.find().populate("postbyuser").sort("-createdAt");
  res.status(200).json({
    status: true,
    message: "All Post",
    post,
  });
});
const getOnlyUserPost = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const post = await Post.find({ postbyuser: _id }).populate("postbyuser");
  res.status(200).json({
    status: true,
    message: "Your Post",
    post,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (req.file) {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: req.file.filename,
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Post Update Successfully",
      post,
    });
  } else {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      message: "Post Update Successfully",
      post,
    });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  res.status(200).json({
    status: true,
    message: "Delete Successgully",
    post,
  });
});

module.exports = {
  createPost,
  allPostGet,
  getOnlyUserPost,
  updatePost,
  deletePost,
};
