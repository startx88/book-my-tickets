import express from "express";
import { body } from "express-validator";
import { signinController } from "../controllers/signin";
import { ValidateRequest } from "../middleware/validate-request";
const route = express.Router();

const validation = [
  body("email", "email is required").isEmail(),
  body("password", "Password is required!")
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be between 6 to max 15 character.")
    .isAlphanumeric()
    .withMessage(
      "Password must be alpha numeric, no special characters allowed."
    ),
];

// Route
route.post(
  "/api/users/signin",

  validation,
  ValidateRequest,
  signinController
);

// Export
export { route as singinRouter };
