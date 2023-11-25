require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { notFound, errorMiddleware } = require("./middleware/errorMiddleware");
const router = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

// middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// router
server.use("/api/user", router);
server.use("/api/post", postRouter);

// for image url
server.use("/postimage", express.static("uploads"));

// error Middleware
server.use(notFound);
server.use(errorMiddleware);

// mongodb connection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server listening on", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
