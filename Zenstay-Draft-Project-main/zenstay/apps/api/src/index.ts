import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import v1Routes from './routes/v1';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', v1Routes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.listen(env.PORT, () => {
  console.log(`ZENSTAY API is running on http://localhost:${env.PORT}`);
});
