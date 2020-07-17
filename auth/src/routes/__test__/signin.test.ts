import request from "supertest";
import { app } from "../../app";

it("return 200 when successfull signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "test1@test.com",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test1@test.com",
      password: "Admin12345",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
