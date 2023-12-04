import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SuperCreateDto {
  @Field(() => Int, { nullable: true })
  id?: number;
}
