import { Router } from "express";

const userController = Router();

userController.get("/profile", (req, res) => {
  // Handle fetching user profile
  res.status(200).send("User profile data");
});

export default userController;