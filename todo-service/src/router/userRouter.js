import express from "express";

import * as UserController from "../controller/userController.js";
// import authen
import auth from "../middleware/auth.js";
// import controllers

const router = express.Router();

// Logic goes here
// Register
router.post("/register", UserController.register);

// Login
router.post("/login", UserController.login);

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Goodbye!");
});

// Welcome
router.get("/welcome", UserController.welcome);

router.get("/detail", auth, UserController.getAuthenticatedUser);

export default router;
