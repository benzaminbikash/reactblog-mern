const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = new express();

// all post
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/mydata", authMiddleware, getUser);

module.exports = router;
