import { CreateAnswerInput } from './create-answer.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerInput extends PartialType(CreateAnswerInput) {}
