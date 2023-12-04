import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { QuestionsModule } from './questions/questions.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { ConfigModule } from '@nestjs/config';
import { AnswersModule } from './answers/answers.module';
import { ChoicesModule } from './choices/choices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule, //
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      sortSchema: true,
    }),
    QuestionnairesModule,
    QuestionsModule,
    AnswersModule,
    ChoicesModule,
  ],
})
export class AppModule {}
