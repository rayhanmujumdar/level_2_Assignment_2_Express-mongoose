import { Schema,model } from "mongoose";
import { IUserModel, TAddress, TOrder, TQuery, TUser, TUsername } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

// fullName schema
const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true,"firstName must be required"]
  },
  lastName: {
    type: String,
    required: [true,"lastName must be required"]
  }
},{_id: false})

// address Schema
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true,"street must be required"]
  },
  city: {
    type: String,
    required: [true,"city must be required"]
  },
  country: {
    type: String,
    required: [true,"country must be required"]
  }
},{_id: false})

// order schema
const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true,"productName must be required"]
  },
  price: {
    type: Number,
    required: [true,"price must be required"]
  },
  quantity: {
    type: Number,
    required: [true,"quantity must be required"]
  }
},{_id: false})



// userSchema
const userSchema = new Schema<TUser,IUserModel>({
  userId: {
    type: Number,
    required: [true,'userId must be required'],
    unique: true
  },   
  username: {
    type: String,
    
    required: [true,'username must be required'],
    unique: true
  },
  password: String,
  fullName: userNameSchema,
  age: Number,
  email: {
    type: String,
    required: [true,'email must be required'],
    unique: true
  },
  isActive: {
    type: Boolean,
    required: [true,"quantity must be required"]
  },
  hobbies: {
    type: [String],
    required: [true,"hobbies must be required"]
  },
  address: addressSchema,
  orders: [orderSchema],
})

// create user pre or post validation
// password hash
userSchema.pre('save',async function (next){
  this.password = await bcrypt.hash(this.password || '',Number(config.salt_Rounds))
  next()
})

// own statics method
userSchema.statics.customFindUser = async function({queryType,search = {},id}: TQuery){
  if(queryType === 'find'){
    return await this.find(search,{password: 0,__v: 0})
  }else if(queryType === 'findById' && id !== null){
    return await this.findById({_id: id},{password: 0})
  }else if(queryType === 'findOne'){
    return await this.findOne(search,{password: 0,__v: 0})
  }
}

const User = model<TUser,IUserModel>('User',userSchema)

export default User