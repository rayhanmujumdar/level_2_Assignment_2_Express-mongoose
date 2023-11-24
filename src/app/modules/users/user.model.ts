import { Schema,model } from "mongoose";
import { TAddress, TOrder, TUser, TUsername } from "./user.interface";

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
})

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
})

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
})



// userSchema
const userSchema = new Schema<TUser>({
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
  orders: orderSchema,
})


const User = model<TUser>('User',userSchema)

export default User