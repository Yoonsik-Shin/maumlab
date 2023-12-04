import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/answers/entities/answer.entity';
import { Choice } from 'src/choices/entities/choice.entity';
import { SuperEntity } from 'src/common/entities/super.entity';
import { Questionnaire } from 'src/questionnaires/entities/questionnaire.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Question extends SuperEntity<Question> {
  @Column()
  @Field(() => Int)
  questionNumber: number;

  @Column()
  @Field(() => String)
  content: string;

  @OneToMany(() => Choice, (choice) => choice.question, { eager: true })
  @Field(() => [Choice], { nullable: true })
  choices?: Choice[];

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  @Field(() => Questionnaire, { nullable: true })
  questionnaire?: Questionnaire;

  @ManyToMany(() => Answer, (answer) => answer.questions)
  @Field(() => [Answer], { nullable: true })
  answers?: Answer[];
}
