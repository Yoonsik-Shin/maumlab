import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

export interface AnswersServiceCreate {
  createAnswerInput: CreateAnswerInput;
}

export interface AnswersServiceFetchOne {
  answerId: number;
}

export interface AnswersServiceUpdate {
  updateAnswerInput: UpdateAnswerInput;
}

export interface AnswersServiceSoftDelete {
  answerId: number;
}
