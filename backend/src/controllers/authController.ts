import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users: any[] = [];

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  res.json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email: user.email }, "secret", { expiresIn: "1h" });
  res.json({ token });
};
