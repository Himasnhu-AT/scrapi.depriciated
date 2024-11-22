export class Logger {
  static debug(message: string) {
    console.log(message);
  }

  static log(message: string) {
    console.log(message);
  }

  static error(message: string, trace: string) {
    console.log(message, trace);
  }

  static warn(message: string) {
    console.log(message);
  }
}
