import express from "express";
import { currentUser } from "../middleware/current-user";
import { User } from "../models/user";
import { requireAuth } from "../middleware/auth-request";
const route = express.Router();

// Route
route.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  async (req, res, next) => {
    const user = req.currentUser;

    const existUser = await User.findById(user?.userId);
    if (!existUser) {
      return res.send({ currentUser: null });
    }

    return res.send({ currentUser: existUser });
  }
);

// Export
export { route as currentUserRouter };
