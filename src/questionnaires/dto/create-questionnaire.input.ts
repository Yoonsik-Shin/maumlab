import { Field, InputType } from '@nestjs/graphql';
import { CreateQuestionInput } from 'src/questions/dto/create-question.input';
import { SuperCreateDto } from 'src/common/dto/super.input';

@InputType()
export class CreateQuestionnaireInput extends SuperCreateDto {
  @Field(() => String)
  title: string;

  @Field(() => [CreateQuestionInput], { nullable: true })
  questions?: CreateQuestionInput[];
}
