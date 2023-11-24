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
 userId: number;
 username: string;
 password: string | undefined;
 fullName: TUsername;
 age: number;
 email: string;
 isActive: boolean;
 hobbies: string[];
 address: TAddress;
 orders?: TOrder[];
};

// user model
export type TQueryType = "find" | "findById" | "findOne";
type fieldKey = {
    [index in keyof TUser] : unknown
}

export type TQuery = {
 queryType: TQueryType;
 id?: TQueryType extends 'findById' ? string : null;
 search?: Partial<fieldKey>
};
export interface IUserModel extends Model<TUser> {
 customFindUser(query: TQuery): TUser;
}
