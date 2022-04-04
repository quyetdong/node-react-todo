import "dotenv/config";
import express, { json } from "express";
// swagger ui
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from 'express-session';

// get json file
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger/swagger.json");

import * as database from "./config/database.js";
import passport from './middleware/passportGoogle.js';
import userRouter from "./router/userRouter.js";
import googleRouter from "./router/googleRouter.js";

const corsOptions = {
  origin: true,
  credentials: true,
};
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};

// connect db
database.connectDb();
// create app
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/google', googleRouter);

export default app;
