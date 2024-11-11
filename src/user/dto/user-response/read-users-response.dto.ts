import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { UserDto } from '../user.dto';

export class ReadUsersResponseDto {
  @ApiProperty({ type: UserDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];
}
