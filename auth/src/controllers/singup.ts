import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { JWT } from "../utils/jwt";

// CONTROLLER
const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  const user = User.build({
    firstname,
    lastname,
    email,
    password,
    mobile,
  });

  await user.save();

  const token = JWT.genToken(user.email, user._id);
  req.session = {
    jwt: token,
  };

  res.status(201).json({
    message: "User Created",
    data: user,
    //token: token,
  });
};

export { signupController };
