
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { createApp } from 'src/main';

let cachedHandler: any;

async function bootstrap() {
  const server = express();

  const app = await createApp();
  app.getHttpAdapter().getInstance().use(server);

  return serverlessExpress({ app: server });
}

export default async function handler(req: any, res: any) {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
}
