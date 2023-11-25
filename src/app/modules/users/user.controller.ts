
import { NextFunction, Request, Response } from "express";
import {
  addNewProductInOrderService,
  createNewUserService,
  deleteUserService,
  getUserOrdersService,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  calculateTotalPriceInUserOrderService
} from "./user.services";
import { orderSchemaValidation, userSchemaValidation } from "./user.validation";
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
    if(!updatedUser) {
      throw error(500, "User Not Found")
    }
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
    next(error(500,parseErrorMsg(err)))
  }
}


// Add New Product in Order controller
export const addNewProductInOrderController = async (req:Request,res:Response,next: NextFunction) => {
  try{
    const product = req.body
    const {userId} = req.params
    const productValidatedData = orderSchemaValidation.parse(product)
    const result = await addNewProductInOrderService(userId,productValidatedData)
    if(!result.modifiedCount) {
      throw error(500, "User Not Found")
    }
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: null
    })
  }catch(err){
    next(error(500,parseErrorMsg(err)))
  }
}

// get user orders by userId
export const getUserOrdersController = async (req:Request,res:Response,next: NextFunction) => {
  try{
    const {userId} = req.params
    const userOrders = await getUserOrdersService(userId)
    if(!userOrders){
      throw error(500,"User not found")
    }
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: userOrders.orders
      }
    })
  }catch(err){
    next(error(500,parseErrorMsg(err)))
  }
}

// calculate total price in user order
export const calculateTotalPriceInUsersOrderController =  async (req:Request,res: Response,next: NextFunction) => {
  try{
    const {userId} = req.params
    const totalPrice = await calculateTotalPriceInUserOrderService(userId)
    if(!totalPrice?.[0]?.totalPrice){
      throw error(500,"User orders Not found")
    }
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: totalPrice[0]
    })
  }catch(err){
    next(error(500,parseErrorMsg(err)))
  }
}