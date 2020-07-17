import mongoose from "mongoose";
import { app, PORT } from "./app";

// Database connection
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEy must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("CONNECTED TO MONGODB");
  } catch (err) {
    console.error(err);
  }

  // server
  app.listen(PORT, () => {
    console.log("Listening server on port", PORT);
  });
};

// start database connection
start();
