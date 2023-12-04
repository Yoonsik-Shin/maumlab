import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver()
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  // TODO: 선택지 생성
  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionsService.createQuestion({
      createQuestionInput,
    });
  }

  // TODO: 모든 선택지 읽어오기
  @Query(() => [Question])
  fetchQuestions(): Promise<Question[]> {
    return this.questionsService.fetchQuestions();
  }

  // TODO: 특정 선택지 읽어오기
  @Query(() => Question)
  fetchQuestion(
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<Question> {
    return this.questionsService.fetchQuestion({ questionId });
  }

  // TODO: 선택지 업데이트
  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionsService.updateQuestion({
      updateQuestionInput,
    });
  }

  // TODO: 선택지 삭제
  @Mutation(() => String)
  softDeleteQuestion(
    @Args('questionQuestionId', { type: () => Int }) questionId: number,
  ): Promise<string> {
    return this.questionsService.softDeleteQuestion({
      questionId,
    });
  }
}
