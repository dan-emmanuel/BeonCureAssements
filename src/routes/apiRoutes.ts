import express, { Request, Response, NextFunction, Router } from 'express';
import { FileController } from 'controllers/FileControllers';
import fs from 'fs';
import path from 'path'
import { CustomRequestHandler } from './type';

const fileController = new FileController();


function asyncHandler(fn: CustomRequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = fn(req, res);
    if (result instanceof Promise) {
      result.catch(next);
    }
  };
}


const checkPathExists = (req: Request, res: Response, next: NextFunction) => {
  const fullPath = path.join(__dirname, '..', '..', 'data', req.params.fileName || '');
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('ressource not found');
  }
  next();
};

const router = Router();

router.get('/files', asyncHandler(fileController.listFiles));
router.use('/files/:fileName?', checkPathExists);
router.get('/files/:fileName/tables', asyncHandler(fileController.listTables));
router.get('/files/:fileName/tables/:tableIndex', asyncHandler(fileController.getTableInfo));
router.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).send('not found');
});
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: { message: 'Something broke!', details: err.message } });
});

export default router; // If you want to use this router in another file
