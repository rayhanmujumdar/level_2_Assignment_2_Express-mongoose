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
exports.deleteUserService = exports.updateUserService = exports.getSingleUserService = exports.getAllUsersService = exports.createNewUserService = void 0;
const error_1 = __importDefault(require("../../lib/error"));
const user_model_1 = __importDefault(require("./user.model"));
// create user service
const createNewUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    const user = result.toObject();
    delete user.password;
    delete user.orders;
    delete user.isDeleted;
    return user;
});
exports.createNewUserService = createNewUserService;
// get all user service
const getAllUsersService = () => {
    const query = { queryType: 'find' };
    const projection = { password: 0, __v: 0, orders: 0, isDeleted: 0 };
    return user_model_1.default.customFindUser(query, projection);
};
exports.getAllUsersService = getAllUsersService;
// get single user service
const getSingleUserService = (userId) => {
    const query = { queryType: 'findOne', searchField: { userId } };
    const projection = { password: 0, orders: 0, __v: 0, isDeleted: 0 };
    return user_model_1.default.customFindUser(query, projection);
};
exports.getSingleUserService = getSingleUserService;
// update user service
const updateUserService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.customFindUser({ queryType: 'findOne', searchField: { userId } });
    if (!user) {
        throw (0, error_1.default)(500, "User not exist");
    }
    const projection = { password: 0, __v: 0, orders: 0, isDeleted: 0 };
    return user_model_1.default.findOneAndUpdate({ userId }, userData, { projection, new: true });
});
exports.updateUserService = updateUserService;
// deleted user service
const deleteUserService = (userId) => {
    return user_model_1.default.updateOne({ userId }, { isDeleted: true });
};
exports.deleteUserService = deleteUserService;
