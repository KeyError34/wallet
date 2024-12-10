import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db/index';
import  userRoute  from './routes/userRouter';  
import  transactionRoute from './routes/transactionRouter';  

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());


connectDB();


app.use('/users', userRoute); 
app.use('/transactions', transactionRoute); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});