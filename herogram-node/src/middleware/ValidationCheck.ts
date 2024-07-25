import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
export default function ValidationCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({
      status: "error",
      data: validationResult(req).array({ onlyFirstError: true }),
    });
  } else {
    next();
  }
}
