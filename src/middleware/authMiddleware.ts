import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findUserByEmail } from "../service/UserService";
import { IUser } from "../types/user";

interface DecodedToken extends JwtPayload {
  userId: number;
  email: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;

      console.log("Decoded token:", decoded);

      const user: IUser | null = await findUserByEmail(decoded.email);

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
