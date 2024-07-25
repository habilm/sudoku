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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const client_1 = require("@prisma/client");
const bcript_1 = require("../utilities/bcript");
const jwt_1 = require("../utilities/jwt");
const prisma = new client_1.PrismaClient();
const Register = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield prisma.users.count({
                where: {
                    email: req.body.email,
                },
            });
            if (count) {
                res
                    .status(400)
                    .json({ status: "error", message: "Account already exist" });
                return;
            }
            else {
                const data = req.body;
                data.password = yield (0, bcript_1.hashPassword)(req.body.password);
                yield prisma.users.create({ data });
                res.json({
                    status: "success",
                    message: "Account has been created successfully",
                });
                return;
            }
        }
        catch (er) {
            console.log(er);
            res.json({ status: "error", message: "Internal Error" }).status(500);
        }
    });
};
exports.Register = Register;
const Login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findFirst({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                res.status(400).json({
                    status: "error",
                    message: "Email Address or password is not valid.",
                });
            }
            if (yield (0, bcript_1.comparePasswords)(req.body.password, (user === null || user === void 0 ? void 0 : user.password) || "--@")) {
                res
                    .json({
                    status: "success",
                    message: "Login success",
                    data: {
                        full_name: user === null || user === void 0 ? void 0 : user.full_name,
                        token: (0, jwt_1.getToken)((user === null || user === void 0 ? void 0 : user.id) || 0),
                    },
                })
                    .status(500);
            }
            else {
                res.status(400).json({
                    status: "error",
                    message: "Email Address or password is not valid",
                });
            }
        }
        catch (er) {
            console.log(er);
            res.json({ status: "error", message: "Internal Error" }).status(500);
        }
    });
};
exports.Login = Login;
