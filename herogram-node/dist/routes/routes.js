"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const RegisterValidator_1 = require("../middleware/RegisterValidator");
const express_validator_1 = require("express-validator");
const ValidationCheck_1 = __importDefault(require("../middleware/ValidationCheck"));
const routes = express_1.default.Router();
routes.post("/register", (0, express_validator_1.checkSchema)(RegisterValidator_1.RegisterValidationSchema), ValidationCheck_1.default, users_1.Register);
routes.post("/login", (0, express_validator_1.checkSchema)(RegisterValidator_1.LoginValidationSchema), ValidationCheck_1.default, users_1.Login);
exports.default = routes;
