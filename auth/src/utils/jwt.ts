import jwt from "jsonwebtoken";
import { Schema } from "mongoose";

export class JWT {
  static genToken(email: string, userId: Schema.Types.ObjectId) {
    return jwt.sign({ email: email, userId: userId }, process.env.JWT_KEY!, {
      expiresIn: "1h",
    });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_KEY!);
  }
}
