import { TQuery, TUser, TUserField } from "./user.interface";
import User from "./user.model";

// create user service
export const createNewUserService = async (userData: TUser) => {
  const result = await User.create(userData)
  const user = result.toObject()
  delete user.password
  delete user.orders
  return user
}

// get all user service
export const getAllUsersService = () => {
  const query: TQuery = {queryType: 'find'}
  const projection: TUserField = {password: 0, __v: 0,orders: 0}
  return User.customFindUser(query,projection)
}

// get single user service
export const getSingleUserService = (userId: string | number) => {
  const query: TQuery = {queryType: 'findOne', searchField: {userId}}
  const projection : TUserField = {password: 0, orders: 0,__v: 0}
  return User.customFindUser(query, projection)
}

// update user service
export const updateUserService = (userId: string | number,userData: TUser) => {
  return User.findOneAndUpdate({userId}, userData,{projection: {password: 0,__v: 0,orders: 0},new: true})
}