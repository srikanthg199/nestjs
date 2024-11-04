import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(/middleware/, `Request method: ${req.method}, URL: ${fullUrl}`);
    next();
  }
}
