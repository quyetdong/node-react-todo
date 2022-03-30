export default function (passport) {
  return passport.authenticate('google', { 
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureMessage: 'Cannot login to Google.'
   });
}
