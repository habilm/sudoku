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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
var client_1 = require("@prisma/client");
var bcript_1 = require("../utilities/bcript");
var prisma = new client_1.PrismaClient();
var Register = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var count, data, _a, er_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, prisma.users.count({
                            where: {
                                email: req.body.email,
                            },
                        })];
                case 1:
                    count = _b.sent();
                    if (!count) return [3 /*break*/, 2];
                    res
                        .status(400)
                        .json({ status: "error", message: "Account already exist" });
                    return [3 /*break*/, 5];
                case 2:
                    data = req.body;
                    _a = data;
                    return [4 /*yield*/, (0, bcript_1.hashPassword)(req.body.password)];
                case 3:
                    _a.password = _b.sent();
                    return [4 /*yield*/, prisma.users.create({ data: data })];
                case 4:
                    _b.sent();
                    res.json({
                        status: "success",
                        message: "Account has been created successfully",
                    });
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    er_1 = _b.sent();
                    console.log(er_1);
                    res.json({ status: "error", message: "Internal Error" }).status(500);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.Register = Register;
var Login = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, er_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma.users.findFirst({
                            where: {
                                email: req.body.email,
                            },
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res.status(400).json({
                            status: "error",
                            message: "Email Address or password is not valid.",
                        });
                    }
                    return [4 /*yield*/, (0, bcript_1.comparePasswords)(req.body.password, (user === null || user === void 0 ? void 0 : user.password) || "--@")];
                case 2:
                    if (_a.sent()) {
                        res.json({ status: "success", message: "Login success" }).status(500);
                    }
                    else {
                        res.status(400).json({
                            status: "error",
                            message: "Email Address or password is not valid",
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    er_2 = _a.sent();
                    console.log(er_2);
                    res.json({ status: "error", message: "Internal Error" }).status(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.Login = Login;
