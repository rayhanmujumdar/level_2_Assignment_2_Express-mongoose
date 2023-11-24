"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseErrorMsg = function (err) {
    var _a, _b;
    try {
        return ((_b = (_a = JSON.parse(err)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || err.message;
    }
    catch (_c) {
        return err.message;
    }
};
exports.default = parseErrorMsg;
