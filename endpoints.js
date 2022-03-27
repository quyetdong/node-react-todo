import session from 'express-session';

// import authen
import auth from './middleware/auth.js';

// import controllers
import register from './controller/register.js';
import login from './controller/login.js';
import welcome from './controller/welcome.js';
import authenGoogle from './controller/authenGoogle.js';
import authenGoogleCallback from './controller/authenGoogleCallback.js';
import protectedUrl from './controller/protectedUrl.js';
import passport from './middleware/googleAuthenSetup.js';

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}

export default function endpoints(app) {
  app.use(session(sessionOptions));
  app.use(passport.initialize())
  app.use(passport.session())

  // Logic goes here
  // Register
  app.post("/register", register);

  // Login
  app.post("/login", login);
  
  app.get("/logout", (req, res) => {
    req.logout();
    res.send('Goodbye!');
  });

  // Welcome
  app.get("/welcome", auth, welcome);

  app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
  });

  app.get("/google/callback", authenGoogleCallback(passport));

  app.get("/auth/google", authenGoogle(passport));

  app.get("/auth/failure", (req, res) => {
    res.send('something went wrong ...');
  });

  app.get("/protected", auth, protectedUrl);
}
