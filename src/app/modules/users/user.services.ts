import { TUser } from "./user.interface";
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
  return User.customFindUser({queryType: 'find'})
}

// get single user service
export const getSingleUserService = (userId: string) => {
  return User.customFindUser({queryType: 'findOne', search: {userId}})
}