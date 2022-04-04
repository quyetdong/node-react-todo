import express from "express";

import userRouter from "./router/userRouter.js";
import googleRouter from "./router/googleRouter.js";

const router = express.Router();

router.use('/user', userRouter);
router.use('/google', googleRouter);

export default router;
