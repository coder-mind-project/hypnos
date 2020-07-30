const express = require('express')
const app = express()
const services = require('./config/services')

services.configurePublicResources(express)
services.configure(app)
services.start(app)
