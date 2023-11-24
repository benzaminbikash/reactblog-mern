const User = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");
const { generateToken } = require("../utils/generateToken");

const createUser = asyncHandler(async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email });
  if (findUser) throw new Error("User Already Exists!");
  const userd = await User.create(req.body);
  res.status(200).json({
    status: true,
    message: "Registration Successfully!",
    user: userd,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("Email And Password is Required!");
  // find user
  const userd = await User.findOne({ email });
  if (userd && (await userd.passwordMatch(password))) {
    const token = generateToken(userd._id);
    res.status(200).json({
      status: true,
      message: "Login Successfully!",
      token,
      data: {
        username: userd.username,
        email: userd.email,
      },
    });
  } else {
    throw new Error("Invalid Credentials!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({
        status: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// update and getuser id

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
