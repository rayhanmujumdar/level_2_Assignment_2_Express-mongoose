import { NextFunction, Request, Response } from "express";
import {
  createNewUserService,
  deleteUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserService
} from "./user.services";
import { userSchemaValidation } from "./user.validation";
import error from "../../lib/error";
import parseErrorMsg from "../../lib/parseErrorMsg";

// create user controller
export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.body;
    const validatedUserData = userSchemaValidation.parse(userData);
    const user = await createNewUserService(validatedUserData);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (err: any) {
    next(error(500, parseErrorMsg(err)));
  }
};

// get all user controller
export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users
    })
  } catch (err) {
    next(error(500, parseErrorMsg(err)));
  }
};

// get a single user by id controller
export const getSingleUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {userId} = req.params
    const user = await getSingleUserService(userId);
    if(!user) {
      throw error(500, "User Not Found")
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: user
    })
  } catch (err) {
    next(error(500, parseErrorMsg(err)));
  }
};


// updated user data
export const updateUserController = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const userData = req.body
    const {userId} = req.params
    const updatedUser = await updateUserService(userId,userData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser
    })
  }catch(err){
    next(error(500,parseErrorMsg(err)))
  }
}

// delete user data
export const deleteUserController = async (req: Request,res: Response,next: NextFunction) => {
  try{
    const {userId} = req.params
    const result = await deleteUserService(userId) 
    if(result.modifiedCount === 0 && result.matchedCount === 1){
      throw error(500, "User already deleted")
    }
    if(result.matchedCount === 0){
      throw error(500,"User not found")
    }
    res.status(200).json({
      success: true,
      message: 'User information delete successfully',
      data: null
    })
  }catch(err){
    next(err)
  }
}
