import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ErrorDto {
  @ApiProperty()
  error: string;
}

export class ErrorResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ErrorDto)
  result: ErrorDto;
}
