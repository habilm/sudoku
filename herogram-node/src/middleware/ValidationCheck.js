"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ValidationCheck;
var express_validator_1 = require("express-validator");
function ValidationCheck(req, res, next) {
    if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
        res.status(400).send({
            status: "error",
            data: (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true }),
        });
    }
    else {
        next();
    }
}
