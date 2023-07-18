import { Response, NextFunction } from 'express';
import { GetUserAuth, JwtPayload } from '../interface/request';
import jwt from 'jsonwebtoken';

export default async (req: GetUserAuth, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = (await jwt.verify(token, 'secretKey1313')) as JwtPayload;
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: 'No access',
      });
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    });
  }
};
