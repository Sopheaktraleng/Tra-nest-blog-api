import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  createDate: string;
  @UpdateDateColumn()
  updateDate: string;
  @DeleteDateColumn()
  deleteDate: string;
}
