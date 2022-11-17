import express, { Request, Response, Router } from 'express';
import path from 'node:path';
import 'dotenv/config';
import { AppModule } from './app.module';

export const router = Router();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
app.use('/', express.static(path.resolve(__dirname, '../', 'uploads')));

new AppModule().instantiate();

export { app };
