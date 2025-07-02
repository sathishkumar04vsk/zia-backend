const express = require("express");
const routes = express.Router();
const { ListFoods, CreateFood, GetFood, UpdateFood, DeleteFood } = require("../controllers/foodController");
const { ObjectId } = require("mongodb");    

routes.get('/', ListFoods);
routes.post('/', CreateFood);
routes.get('/:id', GetFood);
routes.put("/:id", UpdateFood);
routes.delete("/:id", DeleteFood);  


module.exports = routes;