import { CommonEntity } from 'src/modules/common/entity/common';
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
  @OneToMany(() => TweetEntity, (tweet) => tweet.user, {
    nullable: true,
    eager: true,
  })
  tweets: string;
}
