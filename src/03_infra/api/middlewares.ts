import bodyParser from 'body-parser'
import { Express } from 'express'

class Middlewares {
  static configure(express: Express, reqBodySize: Number = 1) {
    express.use(bodyParser.json({ limit: `${reqBodySize}mb` }))
  }
}

export default Middlewares
