// import authen
import auth from './middleware/auth.js';

// import controllers
import register from './controller/register.js';
import login from './controller/login.js';
import welcome from './controller/welcome.js';

export default function endpoints(app) {
  // Logic goes here
  // Register
  app.post("/register", register);

  // Login
  app.post("/login", login);

  // Welcome
  app.post("/welcome", auth, welcome);

  app.get("/welcome", welcome);

}
