import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JWT_KEY } from "../utils/constant";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) =>{
        // Decode user ID from JWT
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decodedToken = jwt.verify(token,JWT_KEY) as { userId: number };

      if(decodedToken){
        return next();
      }
}