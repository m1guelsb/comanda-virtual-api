import express, { Router } from 'express';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
dotenv.config();

const appModule = new AppModule();
export const router = Router();

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log('\x1b[42m--SERVER RUNNING\x1b[0m');
    });

    appModule.instantiate();
  })
  .catch((err) => console.log('\x1b[41m--MONGO CONNECTION ERROR\x1b[0m', err));
