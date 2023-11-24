const jwt = require("jsonwebtoken");

const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/User");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    try {
      if (token) {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(id);
        next();
      }
    } catch (error) {
      throw new Error("Non authorized user");
    }
  }
  if (!token) throw new Error("Token is not avaiable");
});

module.exports = { authMiddleware };
