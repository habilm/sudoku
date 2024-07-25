import { users } from "@prisma/client";

export const RegisterValidationSchema = {
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
export const LoginValidationSchema = {
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
