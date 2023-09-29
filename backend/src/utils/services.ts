import { LoggerService } from './loggerService';

const services = {
  getLogger: (context: string) => new LoggerService(context)
};

export default services;