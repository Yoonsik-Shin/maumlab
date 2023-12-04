import { CreateQuestionnaireInput } from './create-questionnaire.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionnaireInput extends PartialType(
  CreateQuestionnaireInput,
) {}
