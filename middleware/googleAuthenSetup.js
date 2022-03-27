import passport from 'passport';
import * as passportGoogle from 'passport-google-oauth2';

import User from '../model/user.js';

const GoogleStrategy = passportGoogle.Strategy;

const { 
  GOOGLE_CLIENT_ID, 
  GOOGLE_CLIENT_SECRET 
} = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/google/callback",
    passReqToCallback: true,
  },
  function(req, accessToken, refreshToken, profile, done) {
    // console.log('*** google strategy function', profile);
    User.findOne({ googleId: profile.id }, async function (err, user) {
      // console.log('***', user);
      if (user == null) {
        user = await User.create({
          first_name: profile.given_name,
          last_name: profile.family_name,
          email: profile.email,
          googleId: profile.id
        });
      }

      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});

export default passport;
