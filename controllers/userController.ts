import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      phoneNumber: 99999990,
      role: "User",
      avatarImg: "",
    });
    console.log(user);
    return res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    console.error("error in createUser", error);
    return res.status(400).json({ message: "Failed to create user" });
  }
};
