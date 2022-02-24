import 'dotenv/config'
import * as database from './config/database.js';
import express, { json } from "express";
// import User context
import User from './model/user.js';

database.connectDb();
const app = express();

app.use(json());

// Logic goes here
// Register
app.post("/register", (req, res) => {
  // our register logic goes here...
});

// Login
app.post("/login", (req, res) => {
  // our login logic goes here
});

export default app;
