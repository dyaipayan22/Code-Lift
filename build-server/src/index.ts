import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
  console.log('Executing script');
  const outDirPath = path.join('/', 'app', 'output');
  const p = exec(`npm install && npm run build`, { cwd: outDirPath });

  p.stdout?.on('data', function (data) {
    console.log(data.toString());
  });

  p.stdout?.on('error', function (data) {
    console.log('Error', data.toString());
  });

  p.on('close', async function () {
    console.log('Build complete');
    const distFolderPath = path.join(outDirPath, 'dist');
    const distFolderContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    });

    console.log('Uploading');
    for (const file of distFolderContents) {
      const filePath = path.join(distFolderPath, file as string);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log(`Uploading ${file}`);

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: `__outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath).toString(),
      });

      await s3Client.send(command);
      console.log('Uploaded');
    }
    console.log('Done');
  });
}

init();
