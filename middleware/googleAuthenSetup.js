import passport from 'passport';
import * as passportGoogle from 'passport-google-oauth2';

import User from '../model/user.js';

const GoogleStrategy = passportGoogle.Strategy;

const { 
  GOOGLE_CLIENT_ID, 
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK
} = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK,
    passReqToCallback: true,
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log('*** google strategy function ', profile.id);
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

// save user infor to session, save sessionId to browser's cookie
passport.serializeUser(function(user, done) {
  console.log('*** passport serialize ', user._id);
  done(null, user)
});

// get user infor from session (sessionId), attach user infor to req.user
passport.deserializeUser(function(user, done) {
  console.log('*** passport deserialize ', user._id);
  done(null, user)
});

export default passport;
