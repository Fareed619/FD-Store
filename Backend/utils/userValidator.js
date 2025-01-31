import { check, body } from "express-validator";

export const authValidator = [
  body("username", "Invalid, Username is reqiured").notEmpty(),
  body("email", "Ivalid Email ").isEmail(),
  body(
    "password",
    "The password Length must be between 6 to 15 characters"
  ).isLength({ min: 6, max: 15 }),
  body("password", "Password is required").notEmpty(),
];
