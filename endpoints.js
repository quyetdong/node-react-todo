import express from "express";

import userRouter from "./router/userRouter.js";
import googleRouter from "./router/googleRouter.js";

const app = express();

app.use('/user', userRouter);
app.use('/google', googleRouter);
