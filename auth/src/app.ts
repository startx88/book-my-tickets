import expres from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { singinRouter } from "./routes/singin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundErrors } from "./errors/not-found-error";

// create app
const app = expres();
const PORT = 4000;

// constants
app.set("trust proxy", true);
app.use(expres.urlencoded({ extended: true }));
app.use(expres.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
// routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(singinRouter);
app.use(signoutRouter);

// Not found
app.all("*", async () => {
  throw new NotFoundErrors();
});

// Error middleware
app.use(errorHandler);

export { app, PORT };
