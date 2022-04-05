import passport from "passport";

export const authenGoogleCb = () => {
  return passport.authenticate("google", {
    successRedirect: process.env.GOOGLE_AUTHEN_SUCCESS,
    failureRedirect: process.env.GOOGLE_AUTHEN_FAILURE,
    failureMessage: "Cannot login to Google.",
  });
};

export const authenGoogle = () => {
  return passport.authenticate("google", { scope: ["email", "profile"] });
};

export const authenSuccess = (req, res) => {
  res.status(200).send("Authenticate succeeded!");
};
