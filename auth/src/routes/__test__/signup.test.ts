import request from "supertest";
import { app } from "../../app";

it("return a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "test1@test.com",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(201);
});

it("return a 400 with first name requred", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "",
      lastname: "abc",
      email: "test1@test.com",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(400);
});
it("return a 400 with last name requred", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "",
      email: "test1@test.com",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(400);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "asdfdfd",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "asdfdfd",
      password: "2345",
      mobile: "1234567890",
    })
    .expect(400);
});

it("returns a 400 with an invalid or duplicate Mobile", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "asdfdfd",
      password: "2345",
      mobile: "567890",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "",
      password: "",
      mobile: "567890",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
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

  await request(app)
    .post("/api/users/signup")
    .send({
      firstname: "abc",
      lastname: "abc",
      email: "test1@test.com",
      password: "Admin12345",
      mobile: "1234567890",
    })
    .expect(400);
});

it("Sets a cookie after successfull signup", async () => {
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

  expect(response.get("Set-Cookie")).toBeDefined();
});
