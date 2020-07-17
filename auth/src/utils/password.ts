import bcrypt from "bcryptjs";
export class Password {
  static async toHash(password: string) {
    return bcrypt.hash(password, 12);
  }

  static async toCompare(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
