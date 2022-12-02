import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UserCredentialInput } from './dto/User';
import { User } from './user.entity';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Itoken } from './dto/types';




@Injectable()
export class UserService extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepositoy: Repository<User>, private jwtService: JwtService){
        super()
    }
    
    /**
     * 
     * @returns Promise<User[]>
     */
    async findAll():Promise<User[]>{
     return this.userRepositoy.find()
    }



    /**
     * @param createUserInput 
     * @returns Promise<User>
     */
    async signUp(createUserInput:CreateUserInput):Promise<User>{
      const user = this.userRepositoy.create(createUserInput);
      return this.userRepositoy.save(user)
    }


    /**
     * @param userCredentials 
     * @returns Promise<User>
     */
    async signIn(userCredentials: UserCredentialInput): Promise<Itoken>{

        try {
            const user = await this.userRepositoy.findOneBy({
                email: userCredentials.email
            })
            if (!user) {
                throw new UnauthorizedException("User not found");
            }
            else{
                const isMatch = await bcrypt.compare(userCredentials.password, user.password);
                if(!isMatch) throw new UnauthorizedException("Password not match")
                else{
                    const token: Itoken =  {
                        accessToken: this.jwtService.sign({
                            name: user.lastName
                        })
                    }
                    console.log(token)

                    return token
                }
           }
        
        } catch (error) {
            console.log(error)
        }
    }       
}
