import { Router } from "express";
import { addNewProductInOrderController, calculateTotalPriceInUsersOrderController, createUserController, deleteUserController, getAllUsersController, getSingleUserController, getUserOrdersController, updateUserController } from "./user.controller";

const userRoutes = Router()

// * only user routes

// Create a new user route
userRoutes.post('/',createUserController)

// Retrieve a list of all users route
userRoutes.get('/',getAllUsersController)

// Retrieve a specific user by ID route
userRoutes.get('/:userId',getSingleUserController)

// Update user information route
userRoutes.put('/:userId',updateUserController)

// delete user information route
userRoutes.delete('/:userId',deleteUserController)


// * user with orders routes

// Add New Product in Order route
userRoutes.put('/:userId/orders',addNewProductInOrderController)


// get user orders route
userRoutes.get('/:userId/orders', getUserOrdersController)

// calculate total price route
userRoutes.get('/:userId/orders/total-price',calculateTotalPriceInUsersOrderController)

export default userRoutes
