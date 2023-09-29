import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export type CustomRequestHandler = (
  req: Request<ParamsDictionary, any, any, ParsedQs>,
  res: Response<any>
) => Promise<void>;