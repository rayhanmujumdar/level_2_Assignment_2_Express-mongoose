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
exports.calculateTotalPriceInUsersOrderController = exports.getUserOrdersController = exports.addNewProductInOrderController = exports.deleteUserController = exports.updateUserController = exports.getSingleUserController = exports.getAllUsersController = exports.createUserController = void 0;
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
        if (!updatedUser) {
            throw (0, error_1.default)(500, "User Not Found");
        }
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
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.deleteUserController = deleteUserController;
// Add New Product in Order controller
const addNewProductInOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const { userId } = req.params;
        const productValidatedData = user_validation_1.orderSchemaValidation.parse(product);
        const result = yield (0, user_services_1.addNewProductInOrderService)(userId, productValidatedData);
        if (!result.modifiedCount) {
            throw (0, error_1.default)(500, "User Not Found");
        }
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: null
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.addNewProductInOrderController = addNewProductInOrderController;
// get user orders by userId
const getUserOrdersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userOrders = yield (0, user_services_1.getUserOrdersService)(userId);
        if (!userOrders) {
            throw (0, error_1.default)(500, "User not found");
        }
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: {
                orders: userOrders.orders
            }
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.getUserOrdersController = getUserOrdersController;
// calculate total price in user order
const calculateTotalPriceInUsersOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const totalPrice = yield (0, user_services_1.calculateTotalPriceInUserOrderService)(userId);
        if (!((_a = totalPrice === null || totalPrice === void 0 ? void 0 : totalPrice[0]) === null || _a === void 0 ? void 0 : _a.totalPrice)) {
            throw (0, error_1.default)(500, "User orders Not found");
        }
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: totalPrice[0]
        });
    }
    catch (err) {
        next((0, error_1.default)(500, (0, parseErrorMsg_1.default)(err)));
    }
});
exports.calculateTotalPriceInUsersOrderController = calculateTotalPriceInUsersOrderController;
