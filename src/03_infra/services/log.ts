/* eslint-disable no-console */

class Log {
  static print(message: string, reason = 'Hypnos Log'): void {
    console.log(`${new Date()} - ${reason}: ${message}`);
  }

  static colorPrint(message: string, backgroundColor: string, fontColor = '\x1b[37m', reason = 'Hypnos Log'): void {
    console.log(`${new Date()} - ${backgroundColor}%s${fontColor}`, `${reason}: ${message}`, '\x1b[0m');
  }
}

export default Log;
