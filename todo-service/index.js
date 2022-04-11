import "dotenv/config";
// import { createServer } from "http";

import app from "./app.js";
import endpoints from './src/router/index.js';

// const server = createServer(app);
app.use('/api', endpoints);

const port = process.env.PORT || process.env.API_PORT;

// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
