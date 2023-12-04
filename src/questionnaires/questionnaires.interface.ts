import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';

export interface QuestionnairesServiceCreate {
  createQuestionnaireInput: CreateQuestionnaireInput;
}

export interface QuestionnairesServiceFetchOne {
  questionnaireId: number;
}

export interface QuestionnairesServiceUpdate {
  updateQuestionnaireInput: UpdateQuestionnaireInput;
}

export interface QuestionnairesServiceSoftDelete {
  questionnaireId: number;
}
