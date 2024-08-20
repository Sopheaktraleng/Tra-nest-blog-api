import { CommonEntity } from 'src/modules/common/entity/common';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class UserEnity extends CommonEntity {
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  picture: string;
  @Column()
  password: string;
}
