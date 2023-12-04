import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Resolver()
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ): Promise<Answer> {
    return this.answersService.createAnswer({ createAnswerInput });
  }

  @Query(() => [Answer])
  fetchAnswers(): Promise<Answer[]> {
    return this.answersService.fetchAnswers();
  }

  @Query(() => Answer)
  fetchAnswer(
    @Args('answerId', { type: () => Int }) answerId: number,
  ): Promise<Answer> {
    return this.answersService.fetchAnswer({ answerId });
  }

  @Mutation(() => Answer)
  updateAnswer(
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    return this.answersService.updateAnswer({ updateAnswerInput });
  }

  @Mutation(() => String)
  softDeleteAnswer(
    @Args('answerId', { type: () => Int }) answerId: number,
  ): Promise<string> {
    return this.answersService.softDeleteAnswer({ answerId });
  }

  @Query(() => Int)
  getAnswerTotalScore(
    @Args('answerId', { type: () => Int }) answerId: number,
  ): Promise<number> {
    return this.answersService.getAnswerTotalScore({ answerId });
  }
}
