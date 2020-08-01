const express = require('express')
const app = express()
const services = require('./03_infra/services')

services.configurePublicResources(express)
services.configure(app)
services.configureActions(express)
services.start(app)
