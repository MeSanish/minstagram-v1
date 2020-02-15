import jwt from 'jsonwebtoken';
import config from '../config';

interface ITokenPayload {
  id: string;
}

function generateAccessToken(data: ITokenPayload) {
  return jwt.sign(data, config.auth.accessTokenSecretKey, { expiresIn: config.auth.accessTokenDuration });
}

function verifyAccessToken(token: string) {
  return jwt.verify(token, config.auth.accessTokenSecretKey)
}

export function generateToken(payload: ITokenPayload) {
  const accessToken =  generateAccessToken(payload);
  return {
    accessToken,
    expiresIn: config.auth.accessTokenDuration
  }
}

export function verifyReceivedToken(token: string): ITokenPayload {
  return verifyAccessToken(token) as ITokenPayload
}