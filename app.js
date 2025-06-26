const fs = require("node:fs");
const express = require("express");
const path = require("node:path");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRouter");

const app = express();

// 中间件 请求日志
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("这里会不会执行1");
  next();
});
app.use((req, res, next) => {
  console.log("这里会不会执行2");
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
