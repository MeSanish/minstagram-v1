import { Request, Response, NextFunction } from 'express';

import { verifyReceivedToken } from '../service/auth';

export interface IVerifiedRequest extends Request {
  auth?: {
    userId: string;
  };
}

export default function verification(request: IVerifiedRequest, response: Response, next: NextFunction) {
  try {
    const [bearerString, accessToken] = (request.headers.authorization as string).split('Bearer ');

    if (!accessToken) {
      throw new Error('Missing token');
    } else {
      const { id } = verifyReceivedToken(accessToken);
      if (id) {
        request.auth = { userId: id };
        next();
      } else {
        throw new Error('Invalid token');
      }
    }
  } catch (error) {
    next({
      status: '403',
      message: 'Denied Bruh!!'
    });
  }
}