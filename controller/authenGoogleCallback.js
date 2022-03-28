export default function (passport) {
  return passport.authenticate('google', { 
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
   });
   
  // return function (req, res) {
  //   console.log('*** google callback ', req.user)
  //   res.status(200).send('Successfully login via google 🙌');
  // }
}
