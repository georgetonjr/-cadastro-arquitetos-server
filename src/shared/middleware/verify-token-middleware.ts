import { NextFunction, Request, Response } from 'express';
import { factory } from '../../infra/dependency-injection/service-factory';
import { JwtVerify } from '../../usecases/port/encrypt/jwt-verify';
import { TokenExpiredError } from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtService = factory<JwtVerify>('Encrypt');
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não informado' });
    }
    const verify = jwtService.jwtVerify(token);
    req.body.user = verify.data;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' });
    }
  }
};
