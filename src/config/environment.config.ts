import * as process from 'process';

import { EnvironmentDto } from './dto';

export default (): EnvironmentDto => ({
  host: process.env.HOST || '0.0.0.0',
  port: +process.env.PORT || 8000,
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  swaggerFolder: '../storage/docs',
  logsFolder: '../logs',
});
