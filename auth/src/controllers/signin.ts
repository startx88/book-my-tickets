import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { JWT } from "../utils/jwt";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../utils/password";

// CONTROLLER
export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new BadRequestError(
      "Invalid credential, Please use valid credential"
    );
  }

  const verifyPassword = await Password.toCompare(password, user.password);
  if (!verifyPassword) {
    throw new BadRequestError(
      "Invalid credential, Please use valid credential"
    );
  }

  const token = JWT.genToken(user.email, user._id);
  req.session = {
    jwt: token,
  };

  return res.status(200).json({
    message: "User Loggedin",
    data: user,
    // token: token,
  });
};
