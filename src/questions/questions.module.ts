import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { ChoicesModule } from 'src/choices/choices.module';
import { Question } from './entities/question.entity';
import { Choice } from 'src/choices/entities/choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question, //
      Choice,
    ]),
    ChoicesModule,
  ],
  providers: [QuestionsResolver, QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
