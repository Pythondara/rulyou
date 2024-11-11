import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserResponseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
