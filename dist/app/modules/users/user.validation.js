"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidation = void 0;
const zod_1 = require("zod");
// user fullName validation
const userNameSchemaValidation = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "firstName must be required" }).trim().max(20, { message: "FirstName maximum characters length is 20" }).refine((val) => {
        const firstNameCapitalize = val.charAt(0).toUpperCase() + val.slice(1);
        return firstNameCapitalize === val;
    }, { message: "FirstName must be capitalize" }),
    lastName: zod_1.z.string({ required_error: 'lastName must be required' }).trim().max(20, { message: "FirstName maximum characters length is 20" })
});
// address schema validation
const addressSchemaValidation = zod_1.z.object({
    street: zod_1.z.string({ required_error: 'street must be required' }),
    city: zod_1.z.string({ required_error: "city must be required" }),
    country: zod_1.z.string({ required_error: 'country must be required' })
});
// order schema validation
const orderSchemaValidation = zod_1.z.object({
    productName: zod_1.z.string({ required_error: "productName must be required" }),
    price: zod_1.z.number({ required_error: "price must be required" }),
    quantity: zod_1.z.number({ required_error: "quantity must be required" })
});
// user validation
exports.userSchemaValidation = zod_1.z.object({
    userId: zod_1.z.number({ required_error: "userId must be required" }).or(zod_1.z.string()),
    username: zod_1.z.string({ required_error: "username must be required" }).toLowerCase(),
    password: zod_1.z.string({ required_error: "password must be required" }).max(20),
    fullName: userNameSchemaValidation.required(),
    age: zod_1.z.number({ required_error: "age must be required" }).gte(12, { message: "minimum your age required 12" }),
    email: zod_1.z.string({ required_error: "email must be required" }).email({ message: 'invalid email address' }),
    isActive: zod_1.z.boolean({ required_error: 'isActive must be required' }).default(true),
    hobbies: zod_1.z.string({ required_error: 'hobbies must be required' }).array(),
    address: addressSchemaValidation.required(),
    orders: orderSchemaValidation.array().optional(),
    isDeleted: zod_1.z.boolean().default(false)
});
