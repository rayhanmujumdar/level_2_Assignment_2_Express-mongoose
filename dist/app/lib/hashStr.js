"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const hashStr = (text = "") => {
    return bcrypt_1.default.hash(text, Number(config_1.default.salt_Rounds));
};
exports.default = hashStr;
