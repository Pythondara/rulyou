import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import environmentConfig from './config/environment.config';
import { EnvironmentDto } from './config/dto';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<EnvironmentDto, true>) => {
        console.log(config.get('db.host', { infer: true }));
        return {
          type: 'mysql',
          host: config.get('db.host', { infer: true }),
          port: config.get('db.port', { infer: true }),
          username: config.get('db.username', { infer: true }),
          password: config.get('db.password', { infer: true }),
          database: config.get('db.name', { infer: true }),
          entities: [
            join(__dirname, '/**/*.entity{.ts,.js}'),
            join(__dirname, 'entities/**/*.{js,ts}'),
          ],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
