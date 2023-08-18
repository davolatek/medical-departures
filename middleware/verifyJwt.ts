
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../utils/constant';

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_KEY) as { userId: number };
    req.userId = decodedToken.userId; // Attach the user ID to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
