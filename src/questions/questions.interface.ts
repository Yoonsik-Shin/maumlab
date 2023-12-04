import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

export interface QuestionsServiceCreate {
  createQuestionInput: CreateQuestionInput;
}

export interface QuestionsServiceFetchOne {
  questionId: number;
}

export interface QuestionsServiceUpdate {
  updateQuestionInput: UpdateQuestionInput;
}

export interface QuestionsServiceSoftDelete {
  questionId: number;
}
