export default function (passport) {
  return passport.authenticate('google', { 
    successRedirect: process.env.GOOGLE_AUTHEN_SUCCESS,
    failureRedirect: process.env.GOOGLE_AUTHEN_FAILURE,
    failureMessage: 'Cannot login to Google.'
   });
}
