import error from "../../lib/error";
import { TOrder, TQuery, TUser, TUserField } from "./user.interface";
import User from "./user.model";

// create user service
export const createNewUserService = async (userData: TUser) => {
  const result = await User.create(userData)
  const user = result.toObject()
  delete user.password
  delete user.orders
  delete user.isDeleted
  return user
}

// get all user service
export const getAllUsersService = () => {
  const query: TQuery = {queryType: 'find'}
  const projection: TUserField = {password: 0, __v: 0,orders: 0,isDeleted: 0}
  return User.customFindUser(query,projection)
}

// get single user service
export const getSingleUserService = (userId: string | number) => {
  const query: TQuery = {queryType: 'findOne', searchField: {userId}}
  const projection : TUserField = {password: 0, orders: 0,__v: 0,isDeleted: 0}
  return User.customFindUser(query, projection)
}
// update user service
export const updateUserService = async (userId: string | number,userData: TUser) => {
  const projection = {password: 0,__v: 0,orders: 0,isDeleted: 0}
  return User.findOneAndUpdate({userId}, userData,{projection,new: true})
}

// deleted user service
export const deleteUserService = (userId: string | number) => {
  return User.updateOne({userId}, {isDeleted: true})
}

// add new product in order service
export const addNewProductInOrderService = (userId: string | number,productData: TOrder) => {
  return User.updateOne({userId: userId}, {$push: {orders: productData}})
}

//  all orders for a specific user service
export const getUserOrdersService = (userId: string) => {
  return User.customFindUser({queryType: 'findOne',searchField: {userId}}, {orders: 1})
}

// calculate total user order price service
export const calculateTotalPriceInUserOrderService = async (userId: string | number) => {
  const user =  await User.customFindUser({queryType: 'findOne',searchField: {userId}}, {orders: 1})
  if(!user) {
    throw error(500, "User not found")
  }
  const id = typeof Number(userId) === 'number' ? Number(userId) : userId
  return User.aggregate([
    // stage - 1 
    {
      $match: {
        userId: id
      }
    },
    // stage - 2
    {
      $unwind: "$orders"
    },
    // stage - 3
    {
      $group: { _id: "$orders", totalPrice: { $sum: { $multiply: [ "$orders.price", "$orders.quantity" ] } }}
    },
    // stage - 4
    {
      $project: {
        _id: 0
      }
    }
  ])
}