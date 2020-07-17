import request from "supertest";
import { app } from "../../app";

it("clear the cooke after signout", async () => {
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
    .post("/api/users/signout")
    .send({})
    .expect(200);
  // console.log(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
