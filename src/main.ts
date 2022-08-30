import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

require('dotenv').config();
import * as express from 'express';

import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors();
  app.use(`./images`, express.static(join(__dirname, '..', 'images')));
  const config = new DocumentBuilder()
    .setTitle('Etsy Server')
    .setDescription('The Etsy API Server to upload multiple mockups to Etsy')
    .setVersion('1.0')
    .addTag('Etsy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
