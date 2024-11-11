import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  UpdateUserDto,
  UserDto,
  ReadUsersResponseDto,
  UserQueryDto,
} from './dto';
import { ErrorResponseDto, SuccessResponseDto } from '../utils/dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: '2XX',
    type: SuccessResponseDto<CreateUserResponseDto>,
    example: {
      success: true,
      result: {
        id: 13,
      },
    },
  })
  @ApiResponse({ status: '4XX', type: ErrorResponseDto })
  async create(
    @Body()
    dto: UserDto,
  ): Promise<CreateUserResponseDto> {
    return this.service.create(dto);
  }

  @Get('get')
  @ApiOperation({
    summary: 'Receive a list of users',
    description: 'Receive a list of users',
  })
  @ApiQuery({ name: 'full_name', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'efficiency', required: false })
  @ApiResponse({
    status: '2XX',
    type: SuccessResponseDto<ReadUsersResponseDto>,
    example: {
      success: true,
      result: {
        users: [
          {
            id: 5,
            full_name: 'strin234234g',
            role: 'strinxfsdfg',
            efficiency: 345,
          },
        ],
      },
    },
  })
  @ApiResponse({ status: '4XX', type: ErrorResponseDto })
  async read(@Query() query?: UserQueryDto): Promise<ReadUsersResponseDto> {
    return this.service.read(query);
  }

  @Get('get/:id')
  @ApiOperation({
    summary: 'Receive a single of users',
    description: 'Receive a single of users',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiResponse({
    status: '2XX',
    type: SuccessResponseDto<ReadUsersResponseDto>,
    example: {
      success: true,
      result: {
        users: [
          {
            id: 5,
            full_name: 'strin234234g',
            role: 'strinxfsdfg',
            efficiency: 345,
          },
        ],
      },
    },
  })
  @ApiResponse({ status: '4XX', type: ErrorResponseDto })
  async readOne(@Param('id') id: number): Promise<ReadUsersResponseDto> {
    return this.service.readOne(id);
  }

  @Patch('update/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiOperation({
    summary: 'Edit a user by id',
    description: 'Edit a user by id',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: '2XX',
    type: SuccessResponseDto<UserDto>,
    example: {
      success: true,
      result: {
        id: 5,
        full_name: 'string',
        role: 'string',
        efficiency: 0,
        updatedAt: '2024-11-11T14:28:15.000Z',
      },
    },
  })
  @ApiResponse({ status: '4XX', type: ErrorResponseDto })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.service.update(dto, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a user by id',
    description: 'Delete a user by id',
  })
  @ApiResponse({ status: '2XX', example: { success: true } })
  @ApiResponse({ status: '4XX', type: ErrorResponseDto })
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
