import express from 'express';

const app = express();


// Use the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
