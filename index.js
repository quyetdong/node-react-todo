import "dotenv/config";
import { createServer } from "http";
import app from "./app.js";
import './endpoints.js';

const server = createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
