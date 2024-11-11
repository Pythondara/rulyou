import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';

export class SuccessResponseDto<T> {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @ValidateNested({ each: true })
  result?: T;
}
