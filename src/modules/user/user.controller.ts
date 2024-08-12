import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserPayload } from './payload/user.payload';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService){}
  @Post('/create')
  create() {
    return this.userService.create();
  }
  @Get()
  getAll() {}
  @Get()
  getUserById() {}

  @Delete()
  deleteUserById() {}
  @Put()
  updateById() {}
}
