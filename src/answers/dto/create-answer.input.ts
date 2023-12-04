import { Field, InputType } from '@nestjs/graphql';
import { CreateChoiceInput } from 'src/choices/dto/create-choice.input';
import { SuperCreateDto } from 'src/common/dto/super.input';
import { CreateQuestionnaireInput } from 'src/questionnaires/dto/create-questionnaire.input';
import { CreateQuestionInput } from 'src/questions/dto/create-question.input';

@InputType()
export class CreateAnswerInput extends SuperCreateDto {
  @Field(() => CreateQuestionnaireInput)
  questionnaire: CreateQuestionnaireInput;

  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];

  @Field(() => [CreateChoiceInput])
  choices: CreateChoiceInput[];
}
