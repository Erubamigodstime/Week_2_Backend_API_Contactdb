
const fs = require('fs');
const swaggerDocs = require('./swaggerOptions.js');

const outputFile = './swagger-output.json';

// Save the Swagger docs to a file
fs.writeFileSync(outputFile, JSON.stringify(swaggerDocs, null, 2));

console.log('Swagger documentation generated.');

