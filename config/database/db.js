const mongoose = require('mongoose')
const { database } = require('../environments')

/**
 * @function
 * @description Allow connection with database.
 */
mongoose.connect(database.connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).catch(e => {
  const msg = `Error: Connection in mongo database failed, make sure your database is online - Stack: ${e}`
  // eslint-disable-next-line no-console
  console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})
