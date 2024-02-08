const express = require('express')
const controller = require("../Controllers/posts")
const { updatePost } = require('../Models/posts')
const routes = express.Router()



routes.get("/AllPosts",controller.getAllPosts)
routes.delete("/delete/:id", controller.DELETE)
routes.post("/add", controller.add)
routes.get("/search",controller.searchBytitle)
routes.put("/update/:id",controller.update)

module.exports = routes;