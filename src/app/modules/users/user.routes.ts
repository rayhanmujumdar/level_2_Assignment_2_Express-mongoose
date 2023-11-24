import { Router } from "express";
import { createUserController, getAllUsersController, getSingleUserController } from "./user.controller";

const userRoutes = Router()


// Create a new user
userRoutes.post('/',createUserController)

// Retrieve a list of all users
userRoutes.get('/',getAllUsersController)

// Retrieve a specific user by ID
userRoutes.get('/:userId',getSingleUserController)


export default userRoutes
