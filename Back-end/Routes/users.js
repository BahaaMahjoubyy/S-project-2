const express = require('express');
const controller = require('../Controllers/users');
const routes = express.Router();

routes.delete('/DELETE/:id', controller.DELETE);
routes.post('/add', controller.add);
routes.post('/login', controller.login);
routes.get('/profile', controller.authenticateJWT, (req, res) => {
      const userId = req.user.id;
      // Add logic to fetch and send user profile data
});
routes.get('/:id', controller.getUserById);

routes.use(controller.authenticateJWT); // Move this line below the routes definition

module.exports = routes;