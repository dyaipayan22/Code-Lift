import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

export const isLoggedIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw new Error('Unauthorized');
    }
  }
);
