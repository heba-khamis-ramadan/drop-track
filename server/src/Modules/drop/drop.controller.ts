import { Router } from "express";

const dropController = Router();

dropController.post("/create", (req, res) => {
  // Handle drop creation
  res.status(201).send("Drop created");
});

export default dropController;