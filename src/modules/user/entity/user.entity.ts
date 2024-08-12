import { CommonEntity } from 'src/modules/common/entity/common';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class UserEnity extends CommonEntity {
  @Column()
  email: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  dateOfBirth: string;
}
