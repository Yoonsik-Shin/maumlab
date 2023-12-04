import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChoicesService } from './choices.service';
import { CreateChoiceInput } from './dto/create-choice.input';
import { Choice } from './entities/choice.entity';
import { UpdateChoiceInput } from './dto/update-choice.input';

@Resolver()
export class ChoicesResolver {
  constructor(private readonly choicesService: ChoicesService) {}

  @Mutation(() => Choice)
  createChoice(
    @Args('createChoiceInput') createChoiceInput: CreateChoiceInput,
  ): Promise<Choice> {
    return this.choicesService.createChoice({ createChoiceInput });
  }

  @Query(() => [Choice])
  fetchChoices(): Promise<Choice[]> {
    return this.choicesService.fetchChoices();
  }

  @Query(() => Choice)
  fetchChoice(
    @Args('choiceId', { type: () => Int }) choiceId: number,
  ): Promise<Choice> {
    return this.choicesService.fetchChoice({ choiceId });
  }

  @Mutation(() => Choice)
  updateChoice(
    @Args('updateChoiceInput') updateChoiceInput: UpdateChoiceInput,
  ): Promise<Choice> {
    return this.choicesService.updateChoice({ updateChoiceInput });
  }

  @Mutation(() => String)
  softDeleteChoice(
    @Args('choiceId', { type: () => Int }) choiceId: number,
  ): Promise<string> {
    return this.choicesService.softDeleteChoice({ choiceId });
  }
}
