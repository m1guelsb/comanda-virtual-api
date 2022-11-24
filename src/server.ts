import mongoose from 'mongoose';
import { app } from './main';

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw Error('no database url');

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('\x1b[42m--MONGO CONNECTED\x1b[0m');
  })
  .catch((err) => console.log('\x1b[41m--MONGO CONNECTION ERROR\x1b[0m', err));

app.listen(PORT, () => {
  console.log(`\x1b[42m--SERVER RUNNING AT ${PORT}\x1b[0m`);
});
