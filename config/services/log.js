/* eslint-disable no-console */

class Log {
  static print(message, reason = 'Hypnos Log') {
    console.log(`${reason}: ${message}`)
  }

  static colorPrint(message, backgroundColor, fontColor = '\x1b[37m', reason = 'Hypnos Log') {
    console.log(`${backgroundColor}%s${fontColor}`, `${reason}: ${message}`, '\x1b[0m')
  }
}

module.exports = Log
