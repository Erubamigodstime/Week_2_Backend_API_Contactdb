const routes = require('express').Router();
const routers = require('../controllers/controller');


routes.get('/', routers.homePage);
routes.get('/getAll', routers.getAll);
routes.get('/:id', routers.getOne);



module.exports = routes;