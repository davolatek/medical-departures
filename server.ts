import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes/accountRoutes';
import { postRoutes } from './routes/postRoutes';

dotenv.config() as { parsed: { [key: string]: string } };

const app = express();


// Use the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

app.use(express.json());

setupRoutes(app);
postRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
