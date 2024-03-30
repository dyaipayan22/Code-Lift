import { exec } from 'child_process';
import { Redis } from 'ioredis';
import path from 'path';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const publisher = new Redis(process.env.REDIS_SECRET_KEY || '');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

function publishLog(log: any) {
  publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }));
}

async function init() {
  console.log('Executing script');
  publishLog('Build Started');
  const outDirPath = path.join('/', 'app', 'output');
  const p = exec(`npm install && npm run build`, { cwd: outDirPath });

  p.stdout?.on('data', function (data) {
    console.log(data.toString());
    publishLog(data.toString());
  });

  p.stdout?.on('error', function (data) {
    console.log('Error', data.toString());
    publishLog(`Error: ${data.toString()}`);
  });

  p.on('close', async function () {
    console.log('Build completed');
    publishLog('Build Completed');
    const distFolderPath = path.join(outDirPath, 'dist');
    const distFolderContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    });

    console.log('Uploading');
    publishLog('Uploading Files');
    for (const file of distFolderContents) {
      const filePath = path.join(distFolderPath, file as string);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log(`Uploading ${file}`);
      publishLog(`Uploading ${file}`);

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || '',
        Key: `__outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath).toString(),
      });

      await s3Client.send(command);
      console.log('Uploaded');
      publishLog('Upload Completed');
    }
    publishLog('Finished');
    console.log('Done');
  });
}

init();
