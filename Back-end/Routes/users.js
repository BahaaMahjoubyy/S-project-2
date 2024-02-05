const express = require('express')
const controller = require("../Controllers/users")
const routes = express.Router()




routes.delete("/DELETE/:id", controller.DELETE)
routes.post("/add", controller.add)

module.exports = routes;