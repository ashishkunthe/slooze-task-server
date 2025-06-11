import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    role?: string;
    region?: string;
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    res.json({
      message: "token is not provided",
    });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: string;
      region: string;
    };

    req.userId = decode.userId;
    req.role = decode.role;
    req.region = decode.region;
    next();
  } catch (e) {
    res.json({ message: "something went wrong please try later" });
    return;
  }
}

export default authMiddleware;
