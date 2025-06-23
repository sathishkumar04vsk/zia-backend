const express = require("express");
const routes = express.Router();
const { ListUsers, CreateUser, GetUser, UpdateUser, DeleteUser } = require("../controllers/userController")


routes.get('/', ListUsers);
routes.post('/', CreateUser);
routes.get('/:id', GetUser);
routes.put("/:id", UpdateUser);
routes.delete("/:id", DeleteUser);

module.exports = routes