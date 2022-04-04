export default function (passport) {
  return passport.authenticate('google', { scope: ['email', 'profile'] });
}
