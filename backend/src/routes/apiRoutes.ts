import express, { Request, Response, NextFunction, Router } from 'express';
import { FileController } from 'controllers/FileControllers';
import fs from 'fs';
import path from 'path';
import { CustomRequestHandler } from './type';
import services from 'utils/services';

class FileRouter {
  private router: Router;
  private fileController: FileController;
  private logger = services.getLogger('FileRouter');

  constructor() {
    this.router = Router();
    this.fileController = new FileController();
    this.initializeRoutes();
  }

  private asyncHandler(fn: CustomRequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = fn(req, res);
      if (result instanceof Promise) {
        result.catch(next);
      }
    };
  }

  private checkPathExists(req: Request, res: Response, next: NextFunction) {

    const fullPath = path.join(__dirname, '..', '..', 'data', 'tables', `${req.params.fileName}.json`);
    if (!fs.existsSync(fullPath)) {
      // logger should be defined elsewhere or you can pass it as a dependency
      this.logger.error({
        message: `Unable to read file: ${req.params.fileName}`,
        error: `File not found`
      });
      return res.status(404).send(`fullPath ${fullPath} resource not found`);
    }
    next();
  }

  private notFoundHandler(req: express.Request, res: express.Response) {
    res.status(404).send('not found');
  }

  private errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ error: { message: 'Something broke!', details: err.message } });
  }

  private initializeRoutes() {
    this.router.get('/files', this.asyncHandler(this.fileController.listFiles));
    this.router.use('/files/:fileName', this.checkPathExists.bind(this));
    this.router.get('/files/:fileName/tables', this.asyncHandler(this.fileController.listTables));
    this.router.get('/files/:fileName/tables/:tableIndex', this.asyncHandler(this.fileController.getTableInfo));
    this.router.use('*', this.notFoundHandler);
    this.router.use(this.errorHandler);
  }

  public getRouter() {
    return this.router;
  }
}

const fileRouterInstance = new FileRouter();
export default fileRouterInstance.getRouter(); // Export the router for external use
