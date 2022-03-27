export default function (passport) {
  console.log('*** callback')

  return passport.authenticate('google', { 
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
   });
}
