import { Field, InputType, Int } from '@nestjs/graphql';
import { SuperCreateDto } from 'src/common/dto/super.input';

@InputType()
export class CreateChoiceInput extends SuperCreateDto {
  @Field(() => Int)
  choiceNumber: number;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  score: number;
}
