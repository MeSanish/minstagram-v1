import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface IErrorRequest extends ErrorRequestHandler {
  error: {
    status: number;
    message: string;
  };
}

export function errorHandler(err: IErrorRequest, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  res.status(500).send({
    message: `I did something stupid`
  })
}
