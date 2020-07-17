import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/jwt";

interface UserPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = JWT.verifyToken(req.session.jwt) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
