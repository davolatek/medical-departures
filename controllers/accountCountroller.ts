import { Request, Response } from "express";
import { pool } from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../utils/constant";

 // Change this to a strong secret key

export const signUp = async (req: Request, res: Response) => {



  try {
    // check that values are not empty

    const { username, email, firstname, lastname, password } = req.body;
    if (!username || !email || !firstname || !lastname || !password) {
      return res.status(422).send("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    res.status(201).json({ message: "Account successfully created" });
  } catch (error) {
    console.log("AccountController >>>> signUp() >>>> ", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return res.status(422).send("Username/email and password are required");

    const [result] = await pool.query(
      "SELECT * FROM users WHERE email OR username = ?",
      [username]
    );
    const [rows] = result as any;
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid email/username or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: "24h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("AccountController >>>> signin() >>>> ", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
      // Decode user ID from JWT
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decodedToken = jwt.verify(token,JWT_KEY) as { userId: number };
      const userId = decodedToken.userId;
  
      const [result] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [userId]);
      const [rows] = result as any;
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = rows[0];
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };
  
  export const updateUserProfile = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
  
    try {
      // Decode user ID from JWT
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decodedToken = jwt.verify(token, JWT_KEY) as { userId: number };
      const userId = decodedToken.userId;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await pool.query(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
        [username, email, hashedPassword, userId]
      );
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  };
