import express from "express";
const route = express.Router();

// Route
route.post("/api/users/signout", (req, res, next) => {
  req.session = null;
  return res.send({});
});

// Export
export { route as signoutRouter };
