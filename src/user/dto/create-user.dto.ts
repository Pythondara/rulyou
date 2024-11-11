import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
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
}
