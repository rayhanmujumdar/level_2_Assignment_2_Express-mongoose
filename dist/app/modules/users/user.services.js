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
exports.updateUserService = exports.getSingleUserService = exports.getAllUsersService = exports.createNewUserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// create user service
const createNewUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    const user = result.toObject();
    delete user.password;
    delete user.orders;
    return user;
});
exports.createNewUserService = createNewUserService;
// get all user service
const getAllUsersService = () => {
    return user_model_1.default.customFindUser({ queryType: 'find' });
};
exports.getAllUsersService = getAllUsersService;
// get single user service
const getSingleUserService = (userId) => {
    return user_model_1.default.customFindUser({ queryType: 'findOne', search: { userId } });
};
exports.getSingleUserService = getSingleUserService;
// update user service
const updateUserService = (userId, userData) => {
    return user_model_1.default.findOneAndUpdate({ userId }, userData, { projection: { password: 0, __v: 0 }, new: true });
};
exports.updateUserService = updateUserService;
