import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { QuestionnairesService } from './questionnaires.service';

@Resolver()
export class QuestionnairesResolver {
  constructor(private readonly questionnairesService: QuestionnairesService) {}
  @Mutation(() => Questionnaire)
  createQuestionnaire(
    @Args('CreateQuestionnaireInput')
    createQuestionnaireInput: CreateQuestionnaireInput,
  ): Promise<Questionnaire> {
    return this.questionnairesService.createQuestionnaire({
      createQuestionnaireInput,
    });
  }

  @Query(() => [Questionnaire])
  fetchQuestionnaires(): Promise<Questionnaire[]> {
    return this.questionnairesService.fetchQuestionnaires();
  }

  @Query(() => Questionnaire)
  fetchQuestionnaire(
    @Args('questionnaireId', { type: () => Int })
    questionnaireId: number,
  ): Promise<Questionnaire> {
    return this.questionnairesService.fetchQuestionnaire({ questionnaireId });
  }

  @Mutation(() => Questionnaire)
  updateQuestionnaire(
    @Args('updateQuestionnaireInput')
    updateQuestionnaireInput: UpdateQuestionnaireInput,
  ): Promise<Questionnaire> {
    return this.questionnairesService.updateQuestionnaire({
      updateQuestionnaireInput,
    });
  }

  @Mutation(() => String)
  softDeleteQuestionnaire(
    @Args('questionnaireId', { type: () => Int }) questionnaireId: number,
  ): Promise<string> {
    return this.questionnairesService.softDeleteQuestionnaire({
      questionnaireId,
    });
  }
}
