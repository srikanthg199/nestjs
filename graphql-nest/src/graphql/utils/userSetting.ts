import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingsInput {
  @Field((type) => Int)
  user_id: number;

  @Field({ nullable: true, defaultValue: false })
  notifications: boolean;

  @Field({ nullable: true, defaultValue: false })
  language: string;

  @Field({ nullable: true, defaultValue: false })
  darkMode: boolean;
}
