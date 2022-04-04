import "dotenv/config";
import swAutogen from 'swagger-autogen';

const outputFile = './src/swagger/swagger.json'
const endpointsFiles = ['./index.js']
const port = process.env.PORT || process.env.API_PORT;

const doc = {
  host: `localhost:${port}`,
  basePath: "/",
};

const swaggerAutogen = swAutogen();
swaggerAutogen(outputFile, endpointsFiles, doc);
