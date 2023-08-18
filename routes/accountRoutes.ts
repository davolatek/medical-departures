import express from 'express';
import { signUp, signIn, getUserProfile, updateUserProfile } from '../controllers/accountCountroller';

export function setupRoutes(app: express.Application) {
  app.post('/api/signup', signUp);
  app.post('/api/signin', signIn);
  app.get('/api/profile', getUserProfile);
  app.put('/api/profile', updateUserProfile);
}
