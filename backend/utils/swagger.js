const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Management API',
      version: '1.0.0',
      description: 'API for managing recipes',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server',
      },
    ],
  },
  apis: [
    path.resolve(__dirname, '../routes/*.js'),
    path.resolve(__dirname, '../models/*.js')
  ],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};