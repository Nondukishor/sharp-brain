import { Resolver, Query, Mutation, Args, ObjectType } from '@nestjs/graphql';
import { LoginResponse } from './dto/LoginResponse';
import { CreateUserInput, UserCredentialInput } from './dto/User';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [User])
  users(): Promise<User[]> {
    const user = new User();
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.signUp(createUserInput);
  }

  @Mutation(() => LoginResponse)
  signIn(
    @Args('userCredentialInput') userCredentialInput: UserCredentialInput,
  ): Promise<LoginResponse> {
    try {
      return this.userService.signIn(userCredentialInput);
    } catch (error) {
      console.log(error);
    }
  }
}
