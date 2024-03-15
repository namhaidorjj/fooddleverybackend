import express from "express";
import cors from "cors";

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { createUser } from "./controllers/userController";
import { connectToDb } from "./connectToDb";
import { cheackUser } from "./controllers/userController";
import upload from "./middleware/multer";
import Food from "./models/foodModel";

const app = express();
connectToDb();

dotenv.config();

const PORT = 8080;

cloudinary.config({
  cloud_name: "dnx4wmmjs",
  api_key: "246594377776688",
  api_secret: "8rcAa0VfFU79z-Ml4Ilz0EBrNEk",
});
export default cloudinary;

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
const uploadImg = async (img: any) => {
  try {
    const uploadedFile = img;
    if (!uploadedFile) {
      return false;
    }
    try {
      const newImage = await cloudinary.uploader.upload(uploadedFile.path);
      const image = new Food({ image: newImage.secure_url });
      return image.image;
    } catch (error) {
      console.error(error);
      return false;
    }
  } catch (error) {
    console.error("error in uploadImg", error);
  }
};
app.post(
  "/createFood",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const food = JSON.parse(req.body.food);
    const allFood = await Food.find({});
    const check = await Food.findOne({ name: food.foodName });
    if (check) return res.status(400).json({ msg: "Already created food" });
    const url = await uploadImg(req.file);
    const newFood = await Food.create({
      name: food.foodName,
      image: url,
      ingeredient: food.ingredients,
      price: Number(food.price),
    });
    return res.status(201).json({ msg: "Success" });
  }
);
app.listen(PORT, () => {
  console.log("Application running at: http://localhost:" + PORT);
});

app.post("/loginUser", (req: Request, res: Response) => {
  cheackUser(req, res);
});

module.exports = app;
