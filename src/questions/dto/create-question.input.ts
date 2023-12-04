import { Field, InputType, Int } from '@nestjs/graphql';
import { SuperCreateDto } from 'src/common/dto/super.input';
import { CreateChoiceInput } from '../../choices/dto/create-choice.input';

@InputType()
export class CreateQuestionInput extends SuperCreateDto {
  @Field(() => Int)
  questionNumber: number;

  @Field(() => String)
  content: string;

  @Field(() => [CreateChoiceInput], { nullable: true })
  choices?: CreateChoiceInput[];
}
