import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class SuperEntity<T> {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true })
  id?: number;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
