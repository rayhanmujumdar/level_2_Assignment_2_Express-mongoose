import {z} from "zod";


// user fullName validation
const userNameSchemaValidation = z.object({
  firstName: z.string({required_error: "firstName must be required"}).trim().max(20,{message: "FirstName maximum characters length is 20"}).refine((val) => {
    const firstNameCapitalize = val.charAt(0).toUpperCase() + val.slice(1)
    return firstNameCapitalize === val
  },{message: "FirstName must be capitalize"}),
  lastName: z.string({required_error: 'lastName must be required'}).trim().max(20,{message: "FirstName maximum characters length is 20"})
})

// address schema validation

const addressSchemaValidation = z.object({
  street: z.string({required_error: 'street must be required'}),
  city: z.string({required_error: "city must be required"}),
  country: z.string({required_error: 'country must be required'})
})

// order schema validation
const orderSchemaValidation = z.object({
  productName: z.string({required_error: "productName must be required"}),
  price: z.number({required_error: "price must be required"}),
  quantity: z.number({required_error: "quantity must be required"})
})


// user validation
export const userSchemaValidation = z.object({
  userId: z.number({required_error: "userId must be required"}).or(z.string()),
  username: z.string({required_error: "username must be required"}),
  password: z.string({required_error: "password must be required"}).max(20),
  fullName: userNameSchemaValidation.required(),
  age: z.number({required_error: "age must be required"}).gte(12,{message: "minimum your age required 12"}),
  email: z.string({required_error: "email must be required"}).email({message: 'invalid email address'}),
  isActive: z.boolean().default(true),
  hobbies: z.string({required_error: 'hobbies must be required'}).array(),
  address: addressSchemaValidation.required(),
  orders: orderSchemaValidation.array().optional()
})