/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from "mongoose";

// username type
export type TUsername = {
 firstName: string;
 lastName: string;
};
// address type
export type TAddress = {
 street: string;
 city: string;
 country: string;
};

// order
export type TOrder = {
 productName: string;
 price: number;
 quantity: number;
};

// user type
export type TUser = {
 userId: number | string;
 username: string;
 password: string | undefined;
 fullName: TUsername;
 age: number;
 email: string;
 isActive: boolean;
 hobbies: string[];
 address: TAddress;
 orders?: TOrder[];
 isDeleted?: boolean
};

// user model
export type TQueryType = "find" | "findById" | "findOne";
export type TUserField = Partial<{
    [index in keyof TUser] : unknown
} & {__v: number}>

export type TQuery = {
 queryType: TQueryType;
 id?: string;
 searchField?: TUserField
};
export interface IUserModel extends Model<TUser> {
 customFindUser(query: TQuery,projection?: TUserField): TUser;
}
