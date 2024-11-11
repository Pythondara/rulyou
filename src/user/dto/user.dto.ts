import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  efficiency: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
