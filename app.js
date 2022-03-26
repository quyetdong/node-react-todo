import 'dotenv/config';
import express, { json } from "express";

import swaggerUi from 'swagger-ui-express';

// get json file
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger/swagger.json');

import * as database from './config/database.js';
import endpoints from './endpoints.js';

// connect db
database.connectDb();
// create app
const app = express();

app.use(json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

endpoints(app);

export default app;
