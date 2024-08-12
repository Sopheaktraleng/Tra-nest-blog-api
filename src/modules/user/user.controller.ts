import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPayload } from './payload/user.payload';
import { UserEnity } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() userpayload: UserPayload): Promise<UserEnity> {
    return this.userService.create(userpayload);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById() {
    return this.userService.getUserById();
  }

  @Delete(':id')
  deleteUserById() {
    return this.userService.deleteUserById();
  }

  @Put(':id')
  updateById() {
    return this.userService.updateById();
  }
}
