import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return;
  isInitialized = true;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({ origin: '*' });

  await app.init();
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  server(req, res);
}
