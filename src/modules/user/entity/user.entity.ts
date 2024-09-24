import { CommonEntity } from 'src/modules/common/entity/common';
import { AppRoles } from 'src/modules/common/enum/role.enum';
import { TweetEntity } from 'src/modules/tweet/entity/tweet.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
  @Column({
    type: 'simple-array',
    enum: AppRoles,
    default: AppRoles.DEFUALT,
  })
  roles: AppRoles[];
  @OneToMany(() => TweetEntity, (tweet) => tweet.user, {
    nullable: true,
    eager: true,
  })
  tweets: string;
  // Delete password when sent back to client
  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...self } = this;
    return self;
  }
}
