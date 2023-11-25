"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRoutes = (0, express_1.Router)();
// * only user routes
// Create a new user route
userRoutes.post('/', user_controller_1.createUserController);
// Retrieve a list of all users route
userRoutes.get('/', user_controller_1.getAllUsersController);
// Retrieve a specific user by ID route
userRoutes.get('/:userId', user_controller_1.getSingleUserController);
// Update user information route
userRoutes.put('/:userId', user_controller_1.updateUserController);
// delete user information route
userRoutes.delete('/:userId', user_controller_1.deleteUserController);
// * user with orders routes
// Add New Product in Order route
userRoutes.put('/:userId/orders', user_controller_1.addNewProductInOrderController);
// get user orders route
userRoutes.get('/:userId/orders', user_controller_1.getUserOrdersController);
// calculate total price route
userRoutes.get('/:userId/orders/total-price', user_controller_1.calculateTotalPriceInUsersOrderController);
exports.default = userRoutes;
