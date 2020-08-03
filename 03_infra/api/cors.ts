import { Express } from 'express'
import cors from 'cors'

class Cors {
  allowOrigins(origin: string, callback: Function) {
    if (process.env.ORIGINS?.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }

  configure(express: Express) {
    express.use(cors())
  }
}

export default new Cors()
