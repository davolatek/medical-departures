import express from "express";
import { verifyTokenMiddleware } from "../middleware/verifyJwt";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/postController";

export function postRoutes(app: express.Application) {
  app.post("/api/posts", verifyTokenMiddleware, createPost);
  app.put("/api/posts/:id", verifyTokenMiddleware, updatePost);
  app.get("/api/posts", verifyTokenMiddleware, getPosts);
  app.delete("/api/posts/:id", verifyTokenMiddleware, deletePost);
}
