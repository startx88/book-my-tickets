import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongo: any;

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

beforeAll(async () => {
  process.env.JWT_KEY = "ilovemicroservices";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "test1@test.com",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
