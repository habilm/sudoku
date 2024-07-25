"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = require("../controllers/users");
var RegisterValidator_1 = require("../middleware/RegisterValidator");
var express_validator_1 = require("express-validator");
var ValidationCheck_1 = __importDefault(require("../middleware/ValidationCheck"));
var routes = express_1.default.Router();
routes.post("/register", (0, express_validator_1.checkSchema)(RegisterValidator_1.RegisterValidationSchema), ValidationCheck_1.default, users_1.Register);
routes.post("/login", (0, express_validator_1.checkSchema)(RegisterValidator_1.LoginValidationSchema), ValidationCheck_1.default, users_1.Login);
exports.default = routes;
