"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hashStr_1 = __importDefault(require("../../lib/hashStr"));
// fullName schema
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "firstName must be required"]
    },
    lastName: {
        type: String,
        required: [true, "lastName must be required"]
    }
}, { _id: false });
// address Schema
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, "street must be required"]
    },
    city: {
        type: String,
        required: [true, "city must be required"]
    },
    country: {
        type: String,
        required: [true, "country must be required"]
    }
}, { _id: false });
// order schema
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, "productName must be required"]
    },
    price: {
        type: Number,
        required: [true, "price must be required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity must be required"]
    }
}, { _id: false });
// user model schema
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'userId must be required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'username must be required'],
        unique: true
    },
    password: String,
    fullName: userNameSchema,
    age: Number,
    email: {
        type: String,
        required: [true, 'email must be required'],
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: [true, "quantity must be required"]
    },
    hobbies: {
        type: [String],
        required: [true, "hobbies must be required"]
    },
    address: addressSchema,
    orders: [orderSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }
});
// create user pre or post validation
// before save to password hash
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield (0, hashStr_1.default)(this.password);
        next();
    });
});
// before update to password hash
userSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = this.get("password");
        if (password) {
            const hashPassword = yield (0, hashStr_1.default)(password);
            this.set('password', hashPassword);
        }
        next();
    });
});
// before check , is users exist in database!
userSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre("findOne", function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
// before update check the user is exist or not
userSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.findOne({ isDeleted: { $ne: true } });
        next();
    });
});
userSchema.pre("findOneAndUpdate", function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
// own statics method
userSchema.statics.customFindUser = function ({ queryType, searchField = {}, id }, projection) {
    if (queryType === 'find') {
        return this.find(searchField, projection);
    }
    else if (queryType === 'findById' && id !== null) {
        return this.findById(id, projection);
    }
    else if (queryType === 'findOne') {
        return this.findOne(searchField, projection);
    }
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
