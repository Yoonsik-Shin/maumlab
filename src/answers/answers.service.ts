import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import {
  AnswersServiceCreate,
  AnswersServiceFetchOne,
  AnswersServiceUpdate,
} from './answers.interface';
import { AnswersServiceSoftDelete } from 'src/answers/answers.interface';
import { Questionnaire } from 'src/questionnaires/entities/questionnaire.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Choice } from 'src/choices/entities/choice.entity';

@Injectable()
export class AnswersService {
  constructor(private readonly entityManager: EntityManager) {}

  async createAnswer({
    createAnswerInput,
  }: AnswersServiceCreate): Promise<Answer> {
    const questionnaire = await this.entityManager.findOneBy(Questionnaire, {
      id: createAnswerInput.questionnaire.id,
    });
    const allQuestions = await this.entityManager.find(Question);
    if (!allQuestions)
      throw new InternalServerErrorException(
        '서버 오류로 문항을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const questions = createAnswerInput.questions.map((questionInput) =>
      allQuestions.find((question) => question.id === questionInput.id),
    );
    const allChoices = await this.entityManager.find(Choice);
    if (!allChoices)
      throw new InternalServerErrorException(
        '서버 오류로 선택지을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const choices = createAnswerInput.choices.map((choiceInput) =>
      allChoices.find((choice) => choice.id === choiceInput.id),
    );
    const newAnswer = new Answer({
      ...createAnswerInput,
      questionnaire,
      questions,
      choices,
    });

    return this.entityManager.save(newAnswer);
  }

  fetchAnswers(): Promise<Answer[]> {
    return this.entityManager.find(Answer, {
      relations: { questionnaire: true, questions: true, choices: true },
    });
  }

  fetchAnswer({ answerId }: AnswersServiceFetchOne): Promise<Answer> {
    return this.entityManager.findOne(Answer, {
      where: { id: answerId },
      relations: { questionnaire: true, questions: true, choices: true },
    });
  }

  async updateAnswer({
    updateAnswerInput,
  }: AnswersServiceUpdate): Promise<Answer> {
    const targetAnswer = await this.entityManager.findOneBy(Answer, {
      id: updateAnswerInput.id,
    });
    if (!targetAnswer)
      throw new BadRequestException('업데이트할 답변이 존재하지 않습니다.');
    const questionnaire = await this.entityManager.findOneBy(Questionnaire, {
      id: updateAnswerInput.questionnaire.id,
    });
    const allQuestions = await this.entityManager.find(Question);
    if (!allQuestions)
      throw new InternalServerErrorException(
        '서버 오류로 문항을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const questions = updateAnswerInput.questions.map((questionInput) =>
      allQuestions.find((question) => question.id === questionInput.id),
    );
    const allChoices = await this.entityManager.find(Choice);
    if (!allChoices)
      throw new InternalServerErrorException(
        '서버 오류로 선택지을 찾아오지 못했습니다. 다시 시도해주세요.',
      );
    const choices = updateAnswerInput.choices.map((choiceInput) =>
      allChoices.find((choice) => choice.id === choiceInput.id),
    );
    return this.entityManager.save({
      ...targetAnswer,
      questionnaire,
      questions,
      choices,
    });
  }

  async softDeleteAnswer({
    answerId,
  }: AnswersServiceSoftDelete): Promise<string> {
    const targetAnswer = await this.entityManager.findOneBy(Answer, {
      id: answerId,
    });
    const deleteResult = await this.entityManager.softDelete(Answer, {
      id: targetAnswer.id,
    });
    if (!deleteResult.affected)
      throw new InternalServerErrorException(
        '서버 오류로 삭제에 실패했습니다. 다시 시도해주세요.',
      );
    return '정상적으로 삭제되었습니다.';
  }

  async getAnswerTotalScore({ answerId }) {
    const answer = await this.fetchAnswer(answerId);
    return answer.choices.reduce((total, choice) => total + choice.score, 0);
  }
}
