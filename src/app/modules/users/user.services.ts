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
  // const user = await User.customFindUser({queryType: 'findOne',searchField: {userId}}) 
  // if(!user){
  //   throw error(500,"User not exist")
  // }
  const projection = {password: 0,__v: 0,orders: 0,isDeleted: 0}
  return User.findOneAndUpdate({userId}, userData,{projection,new: true})
}

// deleted user service
export const deleteUserService = (userId: string | number) => {
  return User.updateOne({userId}, {isDeleted: true})
}

// add new product in order service
export const addNewProductInOrderService = (id: string,productData: TOrder) => {
  return User.updateOne({userId: id}, {$push: {orders: productData}})
}