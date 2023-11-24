import { NextFunction, Request, Response } from "express";
import {
  createNewUserService,
  getAllUsersService,
  getSingleUserService,
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
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: user
    })
  } catch (err) {
    next(error(500, parseErrorMsg(err)));
  }
};