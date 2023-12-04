import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Choice } from 'src/choices/entities/choice.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Questionnaire } from 'src/questionnaires/entities/questionnaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire, //
      Question,
      Choice,
      Answer,
    ]),
  ],
  providers: [
    AnswersResolver, //
    AnswersService,
  ],
})
export class AnswersModule {}
