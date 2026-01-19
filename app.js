const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRouter");
const promptRouter = require("./routes/promptRoutes");
const organizationRouter = require("./routes/organizationRoutes");
const goldenSampleRouter = require("./routes/goldenSampleRoutes");
const evaluationRouter = require("./routes/evaluationRoutes");

const app = express();

// 中间件 请求日志
app.use(morgan("dev"));
app.use(express.json());
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log("这里会不会执行1");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("这里会不会执行2");
//   next();
// });

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/prompt", promptRouter);
app.use("/api/v1/organization", organizationRouter);
app.use("/api/v1/goldenSample", goldenSampleRouter);
app.use("/api/v1/evaluation", evaluationRouter);

module.exports = app;
