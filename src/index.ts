import express from 'express';
import dotenv from 'dotenv';
import notifyRoute from './routes/notify.route';
import { connectToDB } from './config/db';
import userRoute from './routes/user.route';
import topicRoute from './routes/topic.route';
dotenv.config();

connectToDB()
const app = express();

app.use(express.json());
app.use('/api', notifyRoute);
app.use('/api', userRoute);
app.use('/api', topicRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
