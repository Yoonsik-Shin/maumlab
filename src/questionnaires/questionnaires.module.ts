import { Module } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesResolver } from './questionnaires.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Choice } from 'src/choices/entities/choice.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { Answer } from 'src/answers/entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire, //
      Question,
      Choice,
      Answer,
    ]),
    QuestionsModule,
  ],
  providers: [
    QuestionnairesResolver, //
    QuestionnairesService,
  ],
})
export class QuestionnairesModule {}
