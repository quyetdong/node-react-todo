import swAutogen from 'swagger-autogen';

const outputFile = './swagger/swagger.json'
const endpointsFiles = ['./endpoints.js']
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const doc = {
  host: `localhost:${port}`,
  basePath: "/",
};

const swaggerAutogen = swAutogen();
swaggerAutogen(outputFile, endpointsFiles, doc);
