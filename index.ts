import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { createUser } from "./controllers/userController";
import { connectToDb } from "./connectToDb";
import { cheackUser } from "./controllers/userController";

const app = express();
connectToDb();

dotenv.config();

const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("get is success");
  } catch (error) {
    console.error("get error:", error);
  }
});
app.post("/createUser", (req: Request, res: Response) => {
  createUser(req, res);
});
app.listen(PORT, () => {
  console.log("Application running at: http://localhost:" + PORT);
});

app.post("/loginUser", (req: Request, res: Response) => {
  cheackUser(req, res);
});

module.exports = app;
