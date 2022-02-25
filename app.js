import 'dotenv/config';
import express, { json } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as database from './config/database.js';
// import User context
import User from './model/user.js';
import auth from './middleware/auth.js';

database.connectDb();
const app = express();

app.use(json());

// Logic goes here
// Register
app.post("/register", async (req, res) => {
  // our register logic goes here...
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // Validate if use exist in the database
    const oldUser = await User.findOne({ email })

    // if use exist, response with status code 409
    if (oldUser) {
      res.status(409).send('User already exist. Please login.');
    }

    // if use not exist, continue
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: '1h' }
    );

    // save user token
    user.token = token;
    // await user.save();

    // return new user 
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  // our login logic goes here
  try {
    // get user input
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required.');
    }

    // validate if user exist in our database, response user infor
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;
      return res.status(200).json(user);
    }

    // if user not exist, response error
    res.status(400).send('Invalid credentials.');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Welcome
app.post("/welcome", auth, async (req, res) => {
  res.status(200).send('Welcome 🙌');
})


export default app;
