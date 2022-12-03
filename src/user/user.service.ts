import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UserCredentialInput } from './dto/User';
import { User } from './user.entity';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/LoginResponse';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepositoy: Repository<User>,
    private jwtService: JwtService,
  ) {
    super();
  }

  /**
   *
   * @returns Promise<User[]>
   */
  async findAll(): Promise<User[]> {
    return this.userRepositoy.find();
  }

  /**
   * @param createUserInput
   * @returns Promise<User>
   */
  async signUp(createUserInput: CreateUserInput): Promise<User | any> {
    try {
      return await this.userRepositoy.save({ ...createUserInput });
    } catch (error) {
      return {
        errors: error.message,
      };
    }
  }

  /**
   * @param userCredentials
   */

  async signIn(userCredentials: UserCredentialInput) {
    const user = await this.userRepositoy.findOneBy({
      email: userCredentials.email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else {
      const isMatch = await bcrypt.compare(
        userCredentials.password,
        user.password,
      );
      if (!isMatch) throw new UnauthorizedException('Password not match');
      else {
        const token: LoginResponse = {
          accessToken: this.jwtService.sign({
            ...user,
          }),
          refreshToken: this.jwtService.sign(
            {
              ...user,
            },
            { expiresIn: '1d' },
          ),
        };
        return token;
      }
    }
  }
}
