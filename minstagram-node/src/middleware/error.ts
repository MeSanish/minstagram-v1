import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface IErrorRequest extends ErrorRequestHandler {
  status: number;
  message: string;
}

export function errorHandler(err: IErrorRequest, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  if (err.status && err.message) {
    const { status, message } = err;
    res.status(status).send({
      message,
    });
  }
  else {
    res.status(500).send({
      message: `I did something stupid`
    })

  }
}
