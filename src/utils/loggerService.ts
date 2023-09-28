import { createLogger, format, transports } from 'winston';

// Define custom colors
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  verbose: 'cyan',
  debug: 'green'
};

export class LoggerService {
  private logger;
  private context: string;

  constructor(context: string) {
    this.context = context;
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.colorize({ all: true, colors: logColors }),
        format.timestamp({
          format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
        }),
        format.printf(({ level, message, timestamp }) => {
          const processId = process.pid;
          return `[${level}] - ${processId} - ${timestamp} [${this.context}] ${message}`;
        })
      ),
      defaultMeta: { service: 'your-service-name' },
      transports: [
        new transports.Console()
      ]
    });
  }

  log(level: string, message: any) {
    if (typeof message !== 'string' && typeof message !== 'number' && typeof message !== 'boolean' && typeof message !== 'undefined' && typeof message !== 'symbol' && typeof message !== 'bigint' && message !== null) {
      message = JSON.stringify(message);
    }
    this.logger.log(level, message);
  }

  info(message: any) {
    this.log('info', message);
  }

  warn(message: any) {
    this.log('warn', message);
  }

  error(message: any) {
    this.log('error', message);
  }

  verbose(message: any) {
    this.log('verbose', message);
  }
}
