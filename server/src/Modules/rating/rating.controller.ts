import { Router } from "express";

const ratingController = Router();

ratingController.post("/create", (req, res) => {
  // Handle rating creation
  res.status(201).send("Rating created");
});

export default ratingController;