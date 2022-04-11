import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  start: { type: Date, default: null },
  end: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export default model("todo", todoSchema);
