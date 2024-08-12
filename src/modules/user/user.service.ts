import { Injectable } from '@nestjs/common';
import { UserEnity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPayload } from './payload/user.payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEnity)
    private readonly userReposity: Repository<UserEnity>,
  ) {}
  // Register
  async create(userpayload: UserPayload): Promise<UserEnity> {
    const newUser = await this.userReposity.create(userpayload);
    return await this.userReposity.save(newUser);
  }
  getAll(): string {
    return 'Get all Users!!!';
  }
  getUserById() {
    return 'User #${id} ';
  }
  deleteUserById(): string {
    return 'User is deleted!!';
  }
  updateById(): string {
    return 'user is updateddd!!';
  }
}
