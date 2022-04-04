import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import rfs from "rotating-file-stream";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
// get swagger json file
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./src/swagger/swagger.json");

import * as database from "./src/config/database.js";
import passport from "./src/middleware/passportGoogle.js";

const isProduction = process.env.NODE_ENV == "production";

// connect db
database.connectDb();
// create app
const app = express();
// helmet for security
app.use(helmet());
// morgan
const __dirname = dirname(fileURLToPath(import.meta.url));
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: join(__dirname, "log"),
});
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
app.use(json());
// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// cors
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
// session
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
// passport
app.use(passport.initialize());
app.use(passport.session());

export default app;
