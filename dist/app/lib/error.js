"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const error = (status = 500, message = "Something went wrong") => {
    const err = new Error(message);
    err.status = status;
    return err;
};
exports.default = error;
