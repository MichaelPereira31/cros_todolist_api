import pino, { Logger } from 'pino';

import { ILoggerDataDTO } from '../dtos/ILoggerDataDTO';
import { ILoggerProvider } from '../ILoggerProvider';

type IParseLoggerInputToPinoFormatParams<Payload, Type> = {
  message: string;
  loggerData?: ILoggerDataDTO<Payload, Type>;
};

class LoggerProvider implements ILoggerProvider {
  readonly instance: Logger;

  constructor() {
    this.instance = pino({
      level: 'debug',
    });
  }

  private parseLoggerInputToPinoFormat<Payload, Type>({
    message,
    loggerData,
  }: IParseLoggerInputToPinoFormatParams<Payload, Type>) {
    const { store, ...rest } = loggerData ?? {};

    if (store) {
      return {
        msg: message,
        tag: 'FBINCLUDE',
        ...rest,
      };
    }

    return {
      msg: message,
      ...loggerData,
    };
  }

  info<Payload, Type>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, Type>,
  ): void {
    this.instance.info(
      this.parseLoggerInputToPinoFormat<Payload, Type>({
        loggerData,
        message,
      }),
    );
  }

  warn<Payload, Type>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, Type>,
  ): void {
    this.instance.warn(
      this.parseLoggerInputToPinoFormat<Payload, Type>({
        loggerData,
        message,
      }),
    );
  }

  error<Payload, Type>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, Type>,
  ): void {
    this.instance.error(
      this.parseLoggerInputToPinoFormat<Payload, Type>({
        loggerData,
        message,
      }),
      message,
    );
  }

  debug<Payload, Type>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, Type>,
  ): void {
    this.instance.debug(
      this.parseLoggerInputToPinoFormat<Payload, Type>({
        loggerData,
        message,
      }),
    );
  }
}

export const logger: ILoggerProvider = new LoggerProvider();
