import bodyParser from 'body-parser';
import { Express } from 'express';

class Middlewares {
  static configure(express: Express, reqBodySize = 1): void {
    express.use(bodyParser.json({ limit: `${reqBodySize}mb` }));
  }
}

export default Middlewares;
