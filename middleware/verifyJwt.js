"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../utils/constant");
const verifyJWT = (req, res, next) => {
    var _a;
    // Decode user ID from JWT
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, constant_1.JWT_KEY);
    if (decodedToken) {
        return next();
    }
};
exports.verifyJWT = verifyJWT;
