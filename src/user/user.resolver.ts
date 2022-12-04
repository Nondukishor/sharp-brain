import { Resolver, Query, Mutation, Args, ObjectType } from '@nestjs/graphql';
import { hash } from 'src/helpers/auth-helper';
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

  @Mutation(() => User, { name: 'signUp' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    createUserInput.password = await hash(createUserInput.password);
    return this.userService.signUp(createUserInput);
  }

  @Mutation(() => LoginResponse, { name: 'signIn' })
  async signIn(
    @Args('userCredentialInput') userCredentialInput: UserCredentialInput,
  ): Promise<LoginResponse> {
    try {
      return await this.userService.signIn({ ...userCredentialInput });
    } catch (error) {
      return error;
    }
  }
}
