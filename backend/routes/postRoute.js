const express = require("express");
const {
  createPost,
  allPostGet,
  getOnlyUserPost,
} = require("../controllers/postController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadImage");
const router = new express();

// all post
router.post("/create", authMiddleware, uploadImage.single("image"), createPost);

// all get
router.get("/posts", allPostGet);
router.get("/mypost", authMiddleware, getOnlyUserPost);

module.exports = router;
