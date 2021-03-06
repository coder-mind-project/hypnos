import Log from '../services/log';
import mongoose from 'mongoose';

import { database } from '../environments';

class Bootstrap {
  static connect(): void {
    mongoose
      .connect(database.connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
      .then(() => {
        Log.colorPrint('Connection established!', '\x1b[42m', '\x1b[30m', 'Database');
      })
      .catch(e => {
        Log.colorPrint(
          `Connection in mongo database failed, make sure your database is online - Stack: ${e}`,
          '\x1b[41m',
          '\x1b[37m',
          'Database'
        );
      });
  }
}

export default Bootstrap;
