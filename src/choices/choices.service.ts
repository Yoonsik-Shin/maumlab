import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Choice } from './entities/choice.entity';
import { EntityManager } from 'typeorm';
import {
  ChoicesServiceCreate,
  ChoicesServiceFetchOne,
  ChoicesServiceSoftDelete,
  ChoicesServiceUpdate,
} from './choices.interface';

@Injectable()
export class ChoicesService {
  constructor(
    private readonly entityManager: EntityManager, //
  ) {}

  createChoice({ createChoiceInput }: ChoicesServiceCreate): Promise<Choice> {
    const newChoice = new Choice({ ...createChoiceInput });

    return this.entityManager.save(newChoice);
  }

  fetchChoices(): Promise<Choice[]> {
    return this.entityManager.find(Choice);
  }

  fetchChoice({ choiceId }: ChoicesServiceFetchOne): Promise<Choice> {
    return this.entityManager.findOneBy(Choice, { id: choiceId });
  }

  async updateChoice({
    updateChoiceInput,
  }: ChoicesServiceUpdate): Promise<Choice> {
    const targetChoice = await this.entityManager.findOneBy(Choice, {
      id: updateChoiceInput.id,
    });
    if (!targetChoice)
      throw new BadRequestException('업데이트할 선택지가 존재하지 않습니다.');

    return this.entityManager.save({
      ...targetChoice,
      ...updateChoiceInput,
    });
  }

  async softDeleteChoice({
    choiceId,
  }: ChoicesServiceSoftDelete): Promise<string> {
    const targetChoice = await this.entityManager.findOneBy(Choice, {
      id: choiceId,
    });
    const deleteResult = await this.entityManager.softDelete(Choice, {
      id: targetChoice.id,
    });
    if (!deleteResult.affected)
      throw new InternalServerErrorException(
        '서버 오류로 스터디 삭제에 실패했습니다. 다시 시도해주세요.',
      );
    return '정상적으로 삭제되었습니다.';
  }
}
