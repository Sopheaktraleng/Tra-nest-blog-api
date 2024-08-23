import { CommonEntity } from 'src/modules/common/entity/common';
import { UserEnity } from 'src/modules/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Tweet')
export class TweetEntity extends CommonEntity {
  @Column()
  text: string;
  @Column()
  imageId: string;
  @ManyToOne(() => UserEnity, (user) => user.tweets)
  @JoinColumn({ name: 'UseId' })
  user: string;
}
