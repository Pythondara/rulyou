import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnvironmentDbDto } from './environment-db.dto';
import { Type } from 'class-transformer';

export class EnvironmentDto {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => EnvironmentDbDto)
  db: EnvironmentDbDto;

  @IsString()
  swaggerFolder: string;

  @IsString()
  logsFolder: string;
}
