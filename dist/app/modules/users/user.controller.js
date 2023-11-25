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
exports.deleteUserController = exports.updateUserController = exports.getSingleUserController = exports.getAllUsersController = exports.createUserController = void 0;
const user_services_1 = require("./user.services");
const user_validation_1 = require("./user.validation");
const error_1 = __importDefault(require("../../lib/error"));
const parseErrorMsg_1 = __importDefault(require("../../lib/parseErrorMsg"));
// create user controller
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const validatedUserData = user_validation_1.userSchemaValidation.parse(userData);
        const user = yield (0, user_services_1.createNewUserService)(validatedUserData);
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: user,
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.createUserController = createUserController;
// get all user controller
const getAllUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_services_1.getAllUsersService)();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: users
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.getAllUsersController = getAllUsersController;
// get a single user by id controller
const getSingleUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield (0, user_services_1.getSingleUserService)(userId);
        if (!user) {
            throw (0, error_1.default)(500, "User Not Found");
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: user
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.getSingleUserController = getSingleUserController;
// updated user data
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { userId } = req.params;
        const updatedUser = yield (0, user_services_1.updateUserService)(userId, userData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updatedUser
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.updateUserController = updateUserController;
// delete user data
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield (0, user_services_1.deleteUserService)(userId);
        if (result.modifiedCount === 0 && result.matchedCount === 1) {
            throw (0, error_1.default)(500, "User already deleted");
        }
        if (result.matchedCount === 0) {
            throw (0, error_1.default)(500, "User not found");
        }
        res.status(200).json({
            success: true,
            message: 'User information delete successfully',
            data: null
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserController = deleteUserController;
