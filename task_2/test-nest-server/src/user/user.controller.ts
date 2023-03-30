import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserCreateDto } from 'src/dto/create-user.dto';
import { UserGetDto } from 'src/dto/get-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe()) dto: UserCreateDto) {
    return this.userService.createUser(dto);
  }

  @Get('')
  async getByParams(
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    query: UserGetDto,
  ) {
    const users = await this.userService.getUsersByParams(query);
    if (!users.length)
      throw new HttpException(
        'User data does not match the search and filter criteria',
        HttpStatus.NOT_FOUND,
      );
    return users;
  }
}
