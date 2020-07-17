import express from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { signupController } from "../controllers/singup";
import { BadRequestError } from "../errors/bad-request-error";
import { ValidateRequest } from "../middleware/validate-request";

const route = express.Router();

// validation
const validation = [
  body("firstname", "first name is required!").trim().notEmpty(),
  body("lastname", "last name is required!").trim().notEmpty(),
  body("email", "Email is required!")
    .isEmail()
    .withMessage("Email must be valid")
    .custom(async (value) => {
      const isEmail = await User.findOne({ email: value });
      if (isEmail) {
        return Promise.reject(
          new BadRequestError("Email already existed, Please use another")
        );
      }
      return true;
    }),
  body("password", "Password is required!")
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be between 6 to max 15 character.")
    .isAlphanumeric()
    .withMessage(
      "Password must be alpha numeric, no special characters allowed."
    ),
  body("mobile", "mobile is required")
    .trim()
    .notEmpty()
    .isLength({ min: 10, max: 10 })
    .custom(async (val) => {
      const isMobile = await User.findOne({ mobile: val });
      if (isMobile) {
        return Promise.reject(
          new BadRequestError(
            "Mobile number is already in user, please choose another"
          )
        );
      }
      return true;
    }),
];

// Route
route.post("/api/users/signup", validation, ValidateRequest, signupController);

// Export
export { route as signupRouter };
