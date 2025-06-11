import { Router } from "express";
import { User } from "../db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const route = Router();

dotenv.config();

route.post("/register", async (req, res) => {
  const { name, email, password, role, region } = req.body;

  const validRoles = ["admin", "manager", "member"];
  const validRegions = ["India", "America"];

  if (!validRoles.includes(role) || !validRegions.includes(region)) {
    res.status(400).json({ message: "Invalid role or region" });
    return;
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.json({ message: "user Already exist" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      name: name,
      passwordHash: passwordHash,
      region: region,
      role: role,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role, region: user.region },
      process.env.JWT_SECRET as string
    );

    res.json({ message: "user registered successfull", token: token });
  } catch (error) {
    res.json({ message: "something went wrong " });
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, region: user.region },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default route;
