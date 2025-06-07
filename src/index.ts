import express from 'express';
import dotenv from 'dotenv';
import notifyRoute from './routes/notify.route';
import { connectToDB } from './config/db';
dotenv.config();

connectToDB()
const app = express();

app.use(express.json());
app.use('/api', notifyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
