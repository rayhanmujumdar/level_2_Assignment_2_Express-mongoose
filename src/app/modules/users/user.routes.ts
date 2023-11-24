import { Router } from "express";
import { createUserController, deleteUserController, getAllUsersController, getSingleUserController, updateUserController } from "./user.controller";

const userRoutes = Router()


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


export default userRoutes
