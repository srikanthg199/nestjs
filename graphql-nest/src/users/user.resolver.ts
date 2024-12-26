import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { CreateUserInput } from '../graphql/utils/createUserInput';
import { UserService } from './user.service';
import { Inject } from '@nestjs/common';
import { UserSettings } from 'src/graphql/models/Setting';

const dummyUsers = [
  { id: 1, username: 'Sri', display_name: 'Srikanth Golla' },
  { id: 2, username: 'John Doe', display_name: 'John Doe' },
  { id: 3, username: 'Jane Smith', display_name: 'Jane Smith' },
];

const userSettings = [
  {
    id: 1,
    user_id: 1,
    notifications: true,
    language: 'English',
    darkMode: false,
  },
  {
    id: 2,
    user_id: 2,
    notifications: false,
    language: 'Spanish',
    darkMode: true,
  },
  {
    id: 3,
    user_id: 3,
    notifications: true,
    language: 'French',
    darkMode: false,
  },
];

@Resolver((of) => User)
export class UserResolver {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField(() => UserSettings, { nullable: true, name: 'settings' })
  async settings(@Parent() user: User): Promise<UserSettings> {
    return userSettings.find((userSettings) => userSettings.id === user.id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
