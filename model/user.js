import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  googleId: { type: String }
});

export default model("user", userSchema);

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   first_name: { type: String, default: null },
//   last_name: { type: String, default: null },
//   email: { type: String, unique: true },
//   password: { type: String },
//   token: { type: String },
// });

// module.exports = mongoose.model("user", userSchema);
