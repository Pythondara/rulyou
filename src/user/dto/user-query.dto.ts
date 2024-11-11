import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UserQueryDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(50)
  full_name?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  role?: string;

  @ApiProperty()
  @IsOptional()
  efficiency?: number;
}
