const express = require("express");
const router = new express();
const {
  commentCreate,
  getProductComments,
  deleteComments,
  updateComments,
} = require("../controllers/commentController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, commentCreate);
router.get("/allcomments/:id", getProductComments);
router.delete("/delete/:id", authMiddleware, deleteComments);
router.put("/update/:id", authMiddleware, updateComments);

module.exports = router;
