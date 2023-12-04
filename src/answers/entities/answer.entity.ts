import { Field, ObjectType } from '@nestjs/graphql';
import { Choice } from 'src/choices/entities/choice.entity';
import { SuperEntity } from 'src/common/entities/super.entity';
import { Questionnaire } from 'src/questionnaires/entities/questionnaire.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Answer extends SuperEntity<Answer> {
  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  @Field(() => Questionnaire)
  questionnaire: Questionnaire;

  @ManyToMany(() => Question, (question) => question.answers)
  @JoinTable()
  @Field(() => [Question])
  questions: Question[];

  @ManyToMany(() => Choice, (Choice) => Choice.answers)
  @JoinTable()
  @Field(() => [Choice])
  choices: Choice[];
}
