"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidationSchema = exports.RegisterValidationSchema = void 0;
exports.RegisterValidationSchema = {
    full_name: {
        notEmpty: true,
        escape: true,
        isLength: {
            options: {
                min: 4,
                max: 200,
            },
        },
    },
    email: {
        notEmpty: true,
        isEmail: true,
        isLength: {
            options: {
                min: 4,
                max: 200,
            },
        },
    },
    password: {
        notEmpty: true,
        escape: true,
        isLength: {
            options: {
                min: 4,
                max: 200,
            },
        },
    },
};
exports.LoginValidationSchema = {
    email: {
        notEmpty: true,
        isEmail: true,
        isLength: {
            options: {
                min: 4,
                max: 200,
            },
        },
    },
    password: {
        notEmpty: true,
        escape: true,
        isLength: {
            options: {
                min: 4,
                max: 200,
            },
        },
    },
};
