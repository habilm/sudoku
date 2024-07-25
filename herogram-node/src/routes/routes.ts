import express, { Response, Request } from "express";
import { Register, Login } from "../controllers/users";
import {
  RegisterValidationSchema,
  LoginValidationSchema,
} from "../middleware/RegisterValidator";
import { checkSchema } from "express-validator";
import ValidationCheck from "../middleware/ValidationCheck";
const routes = express.Router();

routes.post(
  "/register",
  checkSchema(RegisterValidationSchema),
  ValidationCheck,
  Register
);
routes.post(
  "/login",
  checkSchema(LoginValidationSchema),
  ValidationCheck,
  Login
);

export default routes;
