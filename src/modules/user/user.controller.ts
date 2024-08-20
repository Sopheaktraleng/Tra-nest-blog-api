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
import { ApiTags } from '@nestjs/swagger';
import { RegisterPayload } from './payload/register.payload';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() registerpayload: RegisterPayload): Promise<UserEnity> {
    return this.userService.create(registerpayload);
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
