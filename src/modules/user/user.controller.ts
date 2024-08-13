import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserPayload } from './payload/user.payload';
import { UserEnity } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userpayload: UserPayload): Promise<UserEnity> {
    return this.userService.create(userpayload);
  }

  @Get()
  async getAll(): Promise<UserEnity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEnity> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() userPayload: UserPayload,
  ): Promise<UserEnity> {
    return this.userService.updateById(id, userPayload);
  }
}
