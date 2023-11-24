const Post = require("../models/Post");
const { asyncHandler } = require("../utils/asyncHandler");

const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(200).json({
    status: true,
    message: "Post Create Successfully",
    post: post,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("Email And Password is Required!");
  // find user
  const userd = await User.findOne({ email });
  if (userd && (await userd.passwordMatch(password))) {
    const token = generateToken(userd._id);
    res
      .cookie("token", token)
      .status(200)
      .json({
        status: true,
        message: "Login Successfully!",
        data: {
          username: userd.username,
          email: userd.email,
        },
      });
  } else {
    throw new Error("Invalid Credentials!");
  }
});

// update and getuser id

module.exports = {
  createPost,
  loginUser,
};
r;
