import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { corsOptions } from './config/cors.config';
import environmentConfig from './config/environment.config';
import Logger from './utils/logger';

ConfigModule.forRoot({
  load: [environmentConfig],
});

const config = environmentConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logsFolder = join(__dirname, '../logs');

  app.useLogger(Logger(logsFolder));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('User service documentation')
    .setDescription('Methods for interacting with user service')
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  app.enableCors(corsOptions);

  await app.listen(config.port, config.host);
}
bootstrap();
