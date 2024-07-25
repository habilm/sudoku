import { Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";
import { comparePasswords, hashPassword } from "../utilities/bcript";
import { getToken } from "../utilities/jwt";
const prisma = new PrismaClient();
export const Register = async function (req: Request, res: Response) {
  try {
    const count = await prisma.users.count({
      where: {
        email: req.body.email,
      },
    });

    if (count) {
      res
        .status(400)
        .json({ status: "error", message: "Account already exist" });
      return;
    } else {
      const data = req.body;
      data.password = await hashPassword(req.body.password);

      await prisma.users.create({ data });
      res.json({
        status: "success",
        message: "Account has been created successfully",
      });
      return;
    }
  } catch (er) {
    console.log(er);
    res.json({ status: "error", message: "Internal Error" }).status(500);
  }
};

export const Login = async function (req: Request, res: Response) {
  try {
    const user = await prisma.users.findFirst({
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

    if (await comparePasswords(req.body.password, user?.password || "--@")) {
      res
        .json({
          status: "success",
          message: "Login success",
          data: {
            full_name: user?.full_name,
            token: getToken(user?.id || 0),
          },
        })
        .status(500);
    } else {
      res.status(400).json({
        status: "error",
        message: "Email Address or password is not valid",
      });
    }
  } catch (er) {
    console.log(er);
    res.json({ status: "error", message: "Internal Error" }).status(500);
  }
};
