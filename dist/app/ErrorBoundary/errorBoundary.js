"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundError = void 0;
const notFoundError = (_req, _res, next) => {
    const err = new Error('Response not found');
    err.status = 404;
    next(err);
};
exports.notFoundError = notFoundError;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error, _req, res, _next) => {
    if (error && error.status) {
        res.status(error.status).json({
            success: false,
            message: 'Something was wrong,please check error.description',
            error: {
                code: error.status,
                description: error.message
            }
        });
    }
    res.status(500).json({
        success: false,
        message: error.message,
        error: {
            code: 500,
            description: "I think you are something mistake please check your input"
        }
    });
};
exports.errorHandler = errorHandler;
