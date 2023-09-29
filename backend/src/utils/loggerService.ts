import winston, { createLogger, format, transports } from 'winston';
import { CLSUtil } from './clsService';
import TimerUtil from './timer';
import express from 'express';

// Define custom colors
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  verbose: 'cyan',
  debug: 'green',
  trace: 'magenta'
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
          const requestId = CLSUtil.getRequestId()
          return `[${level}] - ${processId} - ${timestamp} [${this.context}] ${message} ${requestId ? `[${requestId}]` : ''}`;
        })
      ),
      defaultMeta: { service: 'your-service-name' },
      transports: [
        new transports.Console()
      ],
      levels: { ...winston.config.npm.levels, trace: 0 },

    });
  }

  log(level: string, message: any) {
    if (typeof message !== 'string' && typeof message !== 'number' && typeof message !== 'boolean' && typeof message !== 'undefined' && typeof message !== 'symbol' && typeof message !== 'bigint' && message !== null) {
      message = JSON.stringify(message, null, 2);
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
  trace(message: any) {
    this.log('trace', message);
  }

  static traceMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const logger = new LoggerService('HTTP');

    // Extract or generate request ID
    const requestId = req.headers['x-request-id'] as string || undefined;

    // Intercept res.send data
    const originalSend = res.send.bind(res);
    res.send = (data: any) => {
      res.locals.sentResponse = data;
      return originalSend(data);
    };

    CLSUtil.runWithId(() => {
      logger.trace({
        message: `received request`,
        method: req.method,
        url: req.url,
        requestId: requestId,
        headers: req.headers
      });
      const timerId = CLSUtil.getRequestId();
      TimerUtil.start(timerId);

      // Listen to the response's finish event to log once response is sent.
      res.on('finish', () => {
        const elapsed = TimerUtil.stop(timerId);
        logger.trace({
          message: `response emitted`,
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          sentResponse: res.locals.sentResponse, // Here's the added sentResponse
          treatmentTime: `${elapsed}ms`
        });
      });

      next();
    }, requestId);
  }
}
