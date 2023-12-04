import { CreateChoiceInput } from './dto/create-choice.input';
import { UpdateChoiceInput } from './dto/update-choice.input';

export interface ChoicesServiceCreate {
  createChoiceInput: CreateChoiceInput;
}

export interface ChoicesServiceFetchOne {
  choiceId: number;
}

export interface ChoicesServiceUpdate {
  updateChoiceInput: UpdateChoiceInput;
}

export interface ChoicesServiceSoftDelete {
  choiceId: number;
}
