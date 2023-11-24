"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorBoundary_1 = require("./ErrorBoundary/errorBoundary");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
app.use((0, morgan_1.default)('dev'));
// health route
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Route Health is Good'
    });
});
// error boundary middleware
app.use(errorBoundary_1.notFoundError);
app.use(errorBoundary_1.errorHandler);
exports.default = app;
