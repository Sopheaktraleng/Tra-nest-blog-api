import { Injectable, NotFoundException } from '@nestjs/common';
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
  // Get All Users
  async getAll(): Promise<UserEnity[]> {
    return await this.userReposity.find();
  }
  // Get User By ID
  async getUserById(id: string): Promise<UserEnity> {
    const user = await this.userReposity.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User with ID ${ id } not found');
    }
    return user;
  }
  // Delete User By ID
  async deleteUserById(id: string) {
    const result = await this.userReposity.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User with ID ${id} not found');
    }
    return 'User is deleted successfully!!!';
  }
  // Update by Id
  async updateById(id: string, userPayload: UserPayload): Promise<UserEnity> {
    const user = await this.userReposity.preload({
      id: id,
      ...userPayload,
    });
    if (!user) {
      throw new NotFoundException('User with id ${id} not found!!');
    }
    return await this.userReposity.save(user);
  }
}
