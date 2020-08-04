import { Express } from 'express'

import DI from '../dependencyInjection'
import Database from '../database'
import Middlewares from '../api/middlewares'
import Actions from '../../01_presentation/actions/actions'
import HttpStatusCodeHandler from '../../01_presentation/handlers/httpstatuscode'

import Cors from '../api/cors'
import CommentRepository from '../database/repositories/commentRepository'

class Services {
  static configure(express: Express) {
    Cors.configure(express)

    Middlewares.configure(express)
    Database.connect()
    DI.configure(express)
    Actions.configure(express)
  }

  static configurePublicResources(express: any, path: String = '/public') {
    express().use(path, express.static('public'))
  }

  static configureActions(express: Express) {
    HttpStatusCodeHandler.Configure(express)
  }

  static start(express: Express, port = 3010, host = '0.0.0.0') {
    express.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`server running at port ${port}`)
    })
  }
}

export default Services
