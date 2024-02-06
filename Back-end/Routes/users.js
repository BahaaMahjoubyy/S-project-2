const express = require('express');
const controller = require('../Controllers/users');
const routes = express.Router();
routes.use(controller.authenticateJWT);

routes.delete('/DELETE/:id', controller.DELETE);
routes.post('/add', controller.add);
routes.post('/login', controller.login);
routes.get('/:id', controller.getUserById);
routes.get('/profile', controller.authenticateJWT, (req, res) => {
      const userId = req.user.id;
})
module.exports = routes;