import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  first_name: string;

  @Column({nullable: false})
  username: string;

  @Column('text')
  lastSendTime: Date;
}
