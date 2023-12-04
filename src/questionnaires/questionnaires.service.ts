import { QuestionsService } from './../questions/questions.service';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';

import { Questionnaire } from './entities/questionnaire.entity';
import {
  QuestionnairesServiceCreate,
  QuestionnairesServiceFetchOne,
  QuestionnairesServiceSoftDelete,
  QuestionnairesServiceUpdate,
} from './questionnaires.interface';

@Injectable()
export class QuestionnairesService {
  constructor(
    private readonly entityManager: EntityManager, //
    private readonly questionsService: QuestionsService,
  ) {}

  async createQuestionnaire({
    createQuestionnaireInput,
  }: QuestionnairesServiceCreate): Promise<Questionnaire> {
    const questions = await this.questionsService.fetchQuestions();
    if (!questions)
      throw new InternalServerErrorException(
        '서버 오류로 답변을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const filteredQuestions = questions.filter((choice) => {
      choice.id === createQuestionnaireInput.id;
    });
    const newQuestion = new Questionnaire({
      ...createQuestionnaireInput,
      questions: filteredQuestions,
    });

    return this.entityManager.save(newQuestion);
  }

  fetchQuestionnaires(): Promise<Questionnaire[]> {
    return this.entityManager.find(Questionnaire);
  }

  fetchQuestionnaire({
    questionnaireId,
  }: QuestionnairesServiceFetchOne): Promise<Questionnaire> {
    return this.entityManager.findOneBy(Questionnaire, { id: questionnaireId });
  }

  async updateQuestionnaire({
    updateQuestionnaireInput,
  }: QuestionnairesServiceUpdate): Promise<Questionnaire> {
    const targetQuestion = await this.entityManager.findOneBy(Questionnaire, {
      id: updateQuestionnaireInput.id,
    });
    if (!targetQuestion)
      throw new BadRequestException('업데이트할 선택지가 존재하지 않습니다.');
    const allQuestions = await this.questionsService.fetchQuestions();
    if (!allQuestions)
      throw new InternalServerErrorException(
        '서버 오류로 답변을 찾아오지 못했습니다. 다시 시도해주세요.',
      );

    const questions = updateQuestionnaireInput.questions.map((questionInput) =>
      allQuestions.find((question) => question.id === questionInput.id),
    );
    targetQuestion.questions = questions;
    return this.entityManager.save(targetQuestion);
  }

  async softDeleteQuestionnaire({
    questionnaireId,
  }: QuestionnairesServiceSoftDelete): Promise<string> {
    const targetQuestion = await this.entityManager.findOneBy(Question, {
      id: questionnaireId,
    });
    const deleteResult = await this.entityManager.softDelete(Question, {
      id: targetQuestion.id,
    });
    if (!deleteResult.affected)
      throw new InternalServerErrorException(
        '서버 오류로 질문 삭제에 실패했습니다. 다시 시도해주세요.',
      );
    return '정상적으로 삭제되었습니다.';
  }
}
