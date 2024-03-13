"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userModel_1.default.create({
            name: name,
            email: email,
            password: encryptedPassword,
            phoneNumber: 99999990,
            role: "User",
            avatarImg: "",
        });
        console.log(user);
        return res.status(201).json({ message: "Successfully created" });
    }
    catch (error) {
        console.error("error in createUser", error);
        return res.status(400).json({ message: "Failed to create user" });
    }
});
exports.createUser = createUser;
