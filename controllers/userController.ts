import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const emailMatchedUser = await User.findOne({ email: email });
    if (emailMatchedUser) {
      return res.status(403).json({ msg: "User already exist" });
    }
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

export const cheackUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: any = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(403).json({ msg: "bad password" });
    }

    return res.status(200).json({ message: "successfully login good luck !" });
  } catch (error) {
    console.error("error in createUser", error);
    return res.status(400).json({ message: "User is not found" });
  }
};
