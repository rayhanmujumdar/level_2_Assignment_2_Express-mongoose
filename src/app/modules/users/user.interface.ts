// username type
export type TUsername = {
    firstName: string;
    lastName: string
}
// address type
export type TAddress = {
    street: string;
    city: string;
    country: string
}

// order
export type TOrder = {
    productName: string;
    price: number;
    quantity: number
  }
  

// user type
export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUsername;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
    orders?: TOrder[]
}