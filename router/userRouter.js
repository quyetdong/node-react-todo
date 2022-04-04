import express from "express";
import passport from 'passport';

import register from "../controller/register.js";
import login from "../controller/login.js";
import welcome from "../controller/welcome.js";
import authSuccess from "../controller/authSuccess.js";
import authUser from "../controller/authUser.js";
// import authen
import auth from "../middleware/auth.js";
// import controllers
import authenGoogle from "../controller/authenGoogle.js";

const router = express.Router();

// Logic goes here
// Register
router.post("/register", register);

// Login
router.post("/login", login);

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Goodbye!");
});

// Welcome
router.get("/welcome", welcome);

router.get("/auth/google", authenGoogle(passport));

router.get("/auth/success", auth, authSuccess);

router.get("/auth", auth, authUser);

router.get("/auth/failure", (req, res) => {
  res.send("Something went wrong.");
});

export default router;
