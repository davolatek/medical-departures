// express.d.ts

import { Request } from 'express';

declare module 'express' {
  interface Request {
    userId?: number;
  }
}
