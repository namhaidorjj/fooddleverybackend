import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: String,
  orderNumber: Number,
  foods: Array,
  totalPrice: Number,
  createDate: Date,
  district: String,
  khoroo: String,
  apartment: String,
});

const Order = model("Order", orderSchema);

export default Order;
