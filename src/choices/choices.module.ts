import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesResolver } from './choices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Choice, //
    ]),
  ],
  providers: [
    ChoicesResolver, //
    ChoicesService,
  ],
  exports: [
    ChoicesService, //
  ],
})
export class ChoicesModule {}
