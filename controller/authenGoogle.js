export default function (passport) {
  console.log('** redirect to google authen')

  return passport.authenticate('google', { scope: ['email', 'profile'] });
}
