
import { UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args  } from '@nestjs/graphql';
import { Itoken } from './dto/types';
import { CreateUserInput, UserCredentialInput } from './dto/User';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService : UserService){}
    @Query(returns=>[User])
    users():Promise<User[]>{
        const user = new User()
        return this.userService.findAll()
    }


    @Mutation(returns=>User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput){
      return this.userService.signUp(createUserInput)
    }

    @Mutation(returns=>Itoken)
    signIn(@Args('userCredentialInput') userCredentialInput: UserCredentialInput):Promise<Itoken>{
      try {
        return this.userService.signIn(userCredentialInput)
      } catch (error) {
        console.log(error)
      }
      
    }
}
