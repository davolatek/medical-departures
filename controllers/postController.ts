import {Request, Response} from 'express';
import { pool } from "../db/db";
import jwt from "jsonwebtoken";

export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
  
    try {
      
  
      await pool.query(
        'INSERT INTO posts (title, content, user_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [title, content, req?.userId]
      );
  
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  export const updatePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    const { title, content } = req.body;
  
    try {
      
  
      const [results] = await pool.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [postId, req.userId]);

      const [rows]  = results as any;
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await pool.query('UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?', [title, content, postId]);
  
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  export const getPosts = async (_req: Request, res: Response) => {
    try {
      const [rows] = await pool.query('SELECT * FROM posts');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
  
    try {
    
  
      const [results] = await pool.query('SELECT * FROM posts WHERE id = ? AND user_id = ?', [postId, req.userId]);
      const [rows] = results as any
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await pool.query('DELETE FROM posts WHERE id = ?', [postId]);
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  