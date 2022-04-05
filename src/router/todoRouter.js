import express from "express";

import auth from "../middleware/auth.js";
import * as todoController from "../controller/todoController.js";

const router = express.Router();

router.get("/", auth, todoController.getAllTodos);
router.post("/create", auth, todoController.createTodo);

export default router;
