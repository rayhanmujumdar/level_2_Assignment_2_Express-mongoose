"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRoutes = (0, express_1.Router)();
// Create a new user route
userRoutes.post('/', user_controller_1.createUserController);
// Retrieve a list of all users route
userRoutes.get('/', user_controller_1.getAllUsersController);
// Retrieve a specific user by ID route
userRoutes.get('/:userId', user_controller_1.getSingleUserController);
// Update user information route
userRoutes.put('/:userId', user_controller_1.updateUserController);
exports.default = userRoutes;
