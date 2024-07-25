"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecretKey = "lkjhg";
const getToken = (id) => {
    return jsonwebtoken_1.default.sign({
        id,
    }, jwtSecretKey, { expiresIn: process.env.JWT_EXPIRE || "240h" });
};
exports.getToken = getToken;
const verify = (token) => {
    return jsonwebtoken_1.default.verify(token.substring(7), jwtSecretKey);
};
exports.verify = verify;
