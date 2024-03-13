"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userController_1 = require("../controllers/userController");
const connectToDb_1 = require("../connectToDb");
const app = (0, express_1.default)();
(0, connectToDb_1.connectToDb)();
dotenv_1.default.config();
const PORT = 8000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    try {
        res.send("get is success");
    }
    catch (error) {
        console.error("get error:", error);
    }
});
app.post("/createUser", (req, res) => {
    (0, userController_1.createUser)(req, res);
});
app.listen(PORT, () => {
    console.log("Application running at: http://localhost:" + PORT);
});
module.exports = app;
