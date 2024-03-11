import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: String,
  image: String,
  ingeredient: String,
  price: Number,
  categoryId: String,
});

const Food = model("Food", foodSchema);

export default Food;
