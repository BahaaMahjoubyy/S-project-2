const express = require('express')
const controller = require("../Controllers/posts")
const routes = express.Router()



routes.get("/AllPosts",controller.getAllPosts)
routes.delete("/delete/:id", controller.DELETE)
routes.post("/add", controller.add)
routes.get("/search",controller.searchBytitle)

module.exports = routes;