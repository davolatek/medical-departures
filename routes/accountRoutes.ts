import express from 'express';
import { signUp, signIn, getUserProfile, updateUserProfile } from '../controllers/accountCountroller';
import { verifyTokenMiddleware } from '../middleware/verifyJwt';

export function setupRoutes(app: express.Application) {
  app.post('/api/signup', signUp);
  app.post('/api/signin', signIn);
  app.get('/api/profile', verifyTokenMiddleware, getUserProfile);
  app.put('/api/profile', verifyTokenMiddleware, updateUserProfile);
}
