import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './db/index';
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())

connectDB()

app.listen(port, () => {
  console.log(`Server ranning http://localhost:${port}`);
})
