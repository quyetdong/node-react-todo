import express from "express";
import passport from 'passport';

// import controllers
import authenGoogle from "../controller/authenGoogle.js";
import authenGoogleCallback from "../controller/authenGoogleCallback.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="/google/auth">Authenticate with Google</a>')
});

router.get("/auth", authenGoogle(passport));

router.get("/callback", authenGoogleCallback(passport));

export default router;
