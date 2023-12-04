import { ChoicesService } from './../choices/choices.service';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Question } from './entities/question.entity';
import {
  QuestionsServiceCreate,
  QuestionsServiceFetchOne,
  QuestionsServiceSoftDelete,
  QuestionsServiceUpdate,
} from './questions.interface';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly choicesService: ChoicesService,
  ) {}

  async createQuestion({
    createQuestionInput,
  }: QuestionsServiceCreate): Promise<Question> {
    const choices = await this.choicesService.fetchChoices();
    if (!choices)
      throw new InternalServerErrorException(
        '서버 오류로 답변을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const filteredChoices = choices.filter((choice) => {
      choice.id === createQuestionInput.id;
    });
    const newQuestion = new Question({
      ...createQuestionInput,
      choices: filteredChoices,
    });

    return this.entityManager.save(newQuestion);
  }

  fetchQuestions(): Promise<Question[]> {
    return this.entityManager.find(Question);
  }

  fetchQuestion({ questionId }: QuestionsServiceFetchOne): Promise<Question> {
    return this.entityManager.findOneBy(Question, { id: questionId });
  }

  async updateQuestion({
    updateQuestionInput,
  }: QuestionsServiceUpdate): Promise<Question> {
    const targetQuestion = await this.entityManager.findOneBy(Question, {
      id: updateQuestionInput.id,
    });
    if (!targetQuestion)
      throw new BadRequestException('업데이트할 선택지가 존재하지 않습니다.');
    const allChoices = await this.choicesService.fetchChoices();
    if (!allChoices)
      throw new InternalServerErrorException(
        '서버 오류로 답변을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const choices = updateQuestionInput.choices.map((choiceInput) =>
      allChoices.find((choice) => choice.id === choiceInput.id),
    );
    targetQuestion.choices = choices;
    return this.entityManager.save(targetQuestion);
  }

  async softDeleteQuestion({
    questionId,
  }: QuestionsServiceSoftDelete): Promise<string> {
    const targetQuestion = await this.entityManager.findOneBy(Question, {
      id: questionId,
    });
    const deleteResult = await this.entityManager.softDelete(Question, {
      id: targetQuestion.id,
    });
    if (!deleteResult.affected)
      throw new InternalServerErrorException(
        '서버 오류로 스터디 삭제에 실패했습니다. 다시 시도해주세요.',
      );
    return '정상적으로 삭제되었습니다.';
  }
}
