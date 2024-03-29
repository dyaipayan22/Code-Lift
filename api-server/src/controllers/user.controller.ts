import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import prisma from '../lib/prisma';

export const getUserDeployments = asyncHandler(
  async (req: Request, res: Response) => {
    const deployments = await prisma.deployments.findMany({
      where: {
        userId: (req.user as any).id,
      },
    });
    res.status(200).json({
      success: true,
      deployments,
    });
  }
);
