import express from 'express'
const app = express()

import services from './03_infra/services'

services.configurePublicResources(express)
services.configure(app)
services.configureActions(app)
services.start(app)
