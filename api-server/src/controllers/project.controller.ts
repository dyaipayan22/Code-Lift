import { Request, Response } from 'express';
import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';
import { asyncHandler } from '../utils/asyncHandler';
import prisma from '../lib/prisma';

export const deployProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { gitUrl, projectSlug } = req.body;

    const ecsClient = new ECSClient({
      region: process.env.AWS_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    const command = new RunTaskCommand({
      cluster: process.env.CLUSTER || '',
      taskDefinition: process.env.TASK || '',
      launchType: 'FARGATE',
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: 'ENABLED',
          subnets: [
            process.env.SUBNET_1 || '',
            process.env.SUBNET_2 || '',
            process.env.SUBNET_3 || '',
          ],
          securityGroups: [process.env.SECURITY_GROUP || ''],
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: process.env.IMAGE || '',
            environment: [
              { name: 'GIT_REPOSITORY_URL', value: gitUrl },
              { name: 'PROJECT_ID', value: projectSlug },
              { name: 'AWS_REGION', value: process.env.AWS_REGION || '' },
              {
                name: 'AWS_ACCESS_KEY_ID',
                value: process.env.AWS_ACCESS_KEY_ID || '',
              },
              {
                name: 'AWS_SECRET_ACCESS_KEY',
                value: process.env.AWS_SECRET_ACCESS_KEY || '',
              },
              {
                name: 'S3_BUCKET_NAME',
                value: process.env.S3_BUCKET_NAME || '',
              },
            ],
          },
        ],
      },
    });

    await ecsClient.send(command);

    // await prisma.deployments.create({
    //   data:{

    //   }
    // })
    return res.json({
      status: 'Queued',
      data: { url: `http://${projectSlug}.localhost:8000` },
    });
  }
);
