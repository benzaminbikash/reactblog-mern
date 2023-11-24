const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const router = new express();

// all post
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
