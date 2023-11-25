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
  const post = await Post.findOne({ postbyuser: _id });
  res.status(200).json({
    status: true,
    message: "Your Post",
    post,
  });
});

// update and getuser id

module.exports = {
  createPost,
  allPostGet,
  getOnlyUserPost,
};
