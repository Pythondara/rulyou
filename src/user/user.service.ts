import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';

import { User } from '../entities';
import {
  CreateUserResponseDto,
  UpdateUserDto,
  UserDto,
  ReadUsersResponseDto,
  UserQueryDto,
} from './dto';
import { DeleteUserParamsDto } from './dto/delete-user-params.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async create(dto: UserDto): Promise<CreateUserResponseDto> {
    this.logger.log({ message: 'Creating user...' });

    this.logger.debug({ message: 'Creating user', data: dto });

    const user = new User();
    user.full_name = dto.full_name;
    user.role = dto.role;
    user.efficiency = dto.efficiency;

    await this.userRepository.save(user).catch((err) => {
      this.logger.error({
        message: 'Error retrieving while creating a user',
        data: err,
      });

      throw new BadRequestException('Error retrieving while creating a user');
    });

    this.logger.log({ message: 'User successfully created', data: user.id });

    this.logger.debug({ message: 'User successfully created', data: user });

    return { id: user.id };
  }

  async read(query?: UserQueryDto): Promise<ReadUsersResponseDto> {
    this.logger.log({ message: 'Receiving a users...' });

    const where = {
      full_name: query.full_name ? ILike(`%${query?.full_name}%`) : null,
      efficiency: query.efficiency ? query?.efficiency : null,
      role: query.role ? ILike(`%${query?.role}%`) : null,
    };

    const users: UserDto[] = await this.userRepository
      .find({
        where,
        select: ['id', 'efficiency', 'role', 'full_name'],
      })
      .catch((err) => {
        this.logger.error({
          message: 'Error retrieving while receiving a users',
          data: err,
        });

        throw new BadRequestException(
          'Error retrieving while receiving a users',
        );
      });

    if (users.length === 0) {
      this.logger.error({ message: 'Users not found' });

      throw new BadRequestException('Users not found');
    }

    this.logger.log({ message: 'Users successfully received' });

    return { users };
  }

  async readOne(id: number): Promise<ReadUsersResponseDto> {
    this.logger.log({ message: 'Receiving a user by id...', data: id });

    const users = await this.userRepository
      .findOne({
        where: {
          id,
        },
        select: ['id', 'efficiency', 'role', 'full_name'],
      })
      .catch((err) => {
        this.logger.error({
          message: 'Error retrieving while receiving a user',
          data: err,
        });

        throw new BadRequestException(
          'Error retrieving while receiving a user',
        );
      });

    if (!users) {
      this.logger.error({
        message: 'User with this id does not exist',
        data: id,
      });

      throw new BadRequestException('User with this id does not exist');
    }

    this.logger.log({ message: 'User successfully received', data: users.id });

    this.logger.debug({ message: 'User successfully received', data: users });

    return { users: [users] };
  }

  private async readById(id: number): Promise<UserDto> {
    this.logger.log({ message: 'Receiving a user by id...', data: id });

    const user = await this.userRepository
      .findOne({
        where: { id },
        select: ['id', 'efficiency', 'role', 'full_name'],
      })
      .catch((err) => {
        this.logger.error({
          message: 'Error retrieving while receiving a user',
          data: err,
        });

        throw new BadRequestException({
          message: 'Error retrieving while receiving a user',
          data: err,
        });
      });

    if (!user) {
      this.logger.error({
        message: 'User with this id does not exist',
        data: id,
      });

      throw new BadRequestException('User with this id does not exist');
    }

    this.logger.log({ message: 'User successfully received', data: user.id });

    this.logger.debug({ message: 'User successfully received', data: user });

    return user;
  }

  async update(dto: UpdateUserDto, id: number): Promise<UserDto> {
    const user = await this.readById(id);

    this.logger.log({ message: 'Updating a user', data: id });

    this.logger.debug({ message: 'Updating a user', data: dto });

    user.full_name = dto.full_name;
    user.role = dto.role;
    user.efficiency = dto.efficiency;

    const updatedUser: UserDto = await this.userRepository
      .save(user)
      .catch((err) => {
        this.logger.error({
          message: 'Error retrieving while editing a user',
          data: err,
        });

        throw new BadRequestException('Error retrieving while editing a user');
      });

    this.logger.log({ message: 'User successfully updated', data: id });

    this.logger.debug({
      message: 'User successfully updated',
      data: updatedUser,
    });

    return user;
  }

  async delete(id?: number) {
    if (!id) {
      this.logger.log({ message: 'Deleting all users' });

      await this.userRepository.clear();

      this.logger.log({ message: 'Users successfully deleted' });
    } else {
      const user = await this.readById(id);

      this.logger.log({ message: 'Deleting a user', data: user.id });

      this.logger.debug({ message: 'Deleting a user', data: user });

      await this.userRepository.delete({ id }).catch((err) => {
        this.logger.error({
          message: 'Error retrieving while deleting a user',
          data: err,
        });

        throw new BadRequestException('Error retrieving while deleting a user');
      });

      this.logger.log({ message: 'User successfully deleted', data: user.id });

      this.logger.debug({ message: 'User successfully deleted', data: user });

      return user;
    }
  }
}
