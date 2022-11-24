import 'dotenv/config';
import path from 'node:path';
import cors from 'cors';
import express, { Request, Response, Router } from 'express';
import { AppModule } from './app.module';

export const router = Router();
const app = express();

app.use('/uploads', express.static(path.resolve(__dirname, '../', 'uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err}`,
  });
});

new AppModule().instantiate();

export { app };
