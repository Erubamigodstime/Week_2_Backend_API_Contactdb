const express = require('express');
const routes = express.Router();
const user = require('./user');
const swagger = require('./swagger');

routes.use('/', swagger);
routes.use('/user', user);
routes.use(
    '/',
    (docData = (req, res) => {
      let docData = {
        documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
      };
      res.send(docData);
    })
  );

module.exports = routes;
