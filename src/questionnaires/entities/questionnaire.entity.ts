import { Field, ObjectType } from '@nestjs/graphql';
import { SuperEntity } from 'src/common/entities/super.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Questionnaire extends SuperEntity<Questionnaire> {
  @Column()
  @Field(() => String)
  title: string;

  @OneToMany(() => Question, (question) => question.questionnaire, {
    eager: true,
  })
  @Field(() => [Question], { nullable: true })
  questions?: Question[];
}
