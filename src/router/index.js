import express from "express";

import userRouter from "./userRouter.js";
import googleRouter from "./googleRouter.js";

const router = express.Router();

router.use('/user', userRouter);
router.use('/google', googleRouter);

export default router;
