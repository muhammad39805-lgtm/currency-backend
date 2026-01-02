import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return server;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://ornate-sorbet-0918f3.netlify.app',
    ],
  });

  await app.init();
  isInitialized = true;

  return server;
}

// ✅ Vercel Serverless Handler
export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}
