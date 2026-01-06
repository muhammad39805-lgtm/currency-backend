import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const server = express();
let cachedServer: any;

/**
 * Create Nest App (shared for local + prod)
 */
async function createNestServer() {
  if (cachedServer) {
    return cachedServer;
  }

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: '*',
  });

  await app.init();
  cachedServer = server;
  return server;
}

/**
 * ✅ Vercel Serverless Entry
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await createNestServer();
  app(req, res);
}

/**
 * ✅ Local Development Entry
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Local server running on http://localhost:${port}`);
}

/**
 * Run bootstrap ONLY in local environment
 */
if (!process.env.VERCEL) {
  bootstrap();
}
