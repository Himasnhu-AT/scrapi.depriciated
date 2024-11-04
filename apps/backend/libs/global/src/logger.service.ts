import { Logger as NestLogger } from '@nestjs/common';

export class LoggerSerivce {
  private static logger = new NestLogger('FetchService');

  static debug(message: string) {
    this.logger.debug(message);
  }

  static log(message: string) {
    this.logger.log(message);
  }

  static error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  static warn(message: string) {
    this.logger.warn(message);
  }
}
