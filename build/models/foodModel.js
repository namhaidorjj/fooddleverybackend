"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    name: String,
    image: String,
    ingeredient: String,
    price: Number,
    categoryId: String,
});
const Food = (0, mongoose_1.model)("Food", foodSchema);
exports.default = Food;
