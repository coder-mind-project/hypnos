import { Express } from 'express'
import NotAuthorized from '../../01_presentation/exceptions/NotAuthorized'

const cors = require('cors')

class Cors {
  allowOrigins(origin: string, callback: Function) {
    if (JSON.parse(String(process.env.ORIGINS))?.allowed?.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new NotAuthorized('Not allowed by CORS'))
    }
  }

  configure(express: Express) {
    express.use(cors({ origin: this.allowOrigins }))
  }
}

export default new Cors()
