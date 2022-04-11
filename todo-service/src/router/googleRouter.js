import express from "express";

// import controllers
import * as GoogleController from "../controller/googleController.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="/api/google/auth">Authenticate with Google</a>')
});

router.get("/auth", GoogleController.authenGoogle());

router.get("/callback", GoogleController.authenGoogleCb());

router.get("/auth/success", GoogleController.authenSuccess);

router.get("/auth/failure", (req, res) => {
  res.send("Something went wrong.");
});

export default router;
