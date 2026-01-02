import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';

let cachedServer: any;

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: '*',
  });

  await app.init();

  return serverlessExpress({ app: server });
}

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
}
