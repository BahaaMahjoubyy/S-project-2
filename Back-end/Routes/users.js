const express = require('express');
const controller = require('../Controllers/users');
const routes = express.Router();
routes.use(controller.authenticateJWT); // Move this line below the routes definition

routes.delete('/DELETE/:id', controller.DELETE);
routes.post('/add', controller.add);
routes.post('/login', controller.login);
routes.get('/:email', controller.getUserByemail);
routes.get('/', controller.getAllUsers)


module.exports = routes;