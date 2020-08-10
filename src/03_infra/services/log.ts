/* eslint-disable no-console */

class Log {
  static print(message: any, reason: String = 'Hypnos Log') {
    console.log(`${new Date()} - ${reason}: ${message}`)
  }

  static colorPrint(
    message: String,
    backgroundColor: String,
    fontColor: String = '\x1b[37m',
    reason: String = 'Hypnos Log'
  ) {
    console.log(`${new Date()} - ${backgroundColor}%s${fontColor}`, `${reason}: ${message}`, '\x1b[0m')
  }
}

export default Log
