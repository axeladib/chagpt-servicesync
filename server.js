import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import messageRoute from './routes/messageRoute';

config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URL;
const FRONTEND_CONNECTION = process.env.FRONTEND_CONNECTION;

const corsOptions = {
  origin: FRONTEND_CONNECTION,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api/message', messageRoute);

app.get('/', (req, res) => {
  res.send('Twilio Application');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Successful connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });
