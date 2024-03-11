"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: String,
    orderNumber: Number,
    foods: Array,
    totalPrice: Number,
    createDate: Date,
    district: String,
    khoroo: String,
    apartment: String,
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
