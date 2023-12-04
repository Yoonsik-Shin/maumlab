import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/answers/entities/answer.entity';
import { SuperEntity } from 'src/common/entities/super.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Choice extends SuperEntity<Choice> {
  @Column()
  @Field(() => Int)
  choiceNumber: number;

  @Column()
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => Int)
  score: number;

  @ManyToOne(() => Question, (question) => question.choices)
  @Field(() => Question, { nullable: true })
  question?: Question;
  @ManyToMany(() => Answer, (answer) => answer.choices)
  @Field(() => Answer, { nullable: true })
  answers?: Answer[];
}
