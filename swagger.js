const swaggerAutogen = require('swagger-autogen')();


const doc = {
  swagger: '2.0',
  info: {
    title: 'My API',
    description: 'User API'
  },
  host: 'localhost:8000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index'];



swaggerAutogen(outputFile, routes, doc);