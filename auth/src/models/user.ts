import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Password } from "../utils/password";

const Schema = mongoose.Schema;

export const secret_key = "iloavemicroservices";

// An interface describe the schema properties
export interface UserAttrs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  token?: string;
  expireToken?: string;
  verify?: boolean;
  active?: boolean;
  insertAt?: Date;
}

// An interface describe the model properties
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  active?: boolean;
  insertAt?: Date;
}

// define the user schema
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// presave hooks
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// Build methods
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
