import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('\x1b[42m--MONGO CONNECTED\x1b[0m');

    app.listen(3001, () => {
      console.log('\x1b[44m--SERVER RUNNING\x1b[0m');
    });
  })
  .catch(() => console.log('MONGO CONNECTION ERROR'));
