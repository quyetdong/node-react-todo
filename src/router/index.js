import express from "express";

import userRouter from "./userRouter.js";
import googleRouter from "./googleRouter.js";
import todoRouter from "./todoRouter.js";

const router = express.Router();

router.use('/user', userRouter);
router.use('/google', googleRouter);
router.use('/todo', todoRouter);

export default router;
