import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ChangePasswordInput,
  CreateUserInput,
  ForgotPasswordInput,
  UserCredentialInput,
} from './dto/User';
import { User } from './user.entity';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/LoginResponse';
import { isMatch, tokenGenerator } from 'src/helpers/auth-helper';
@Injectable()
export class UserService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super();
  }

  /**
   * @returns Promise<User[]>
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * @param email
   * @returns boolean
   */

  async findByEmail(email: string) {
    const found = await this.userRepository.findOneBy({
      email: email,
    });
    if (found) return true;
    return false;
  }

  /**
   * @param createUserInput
   * @returns Promise<User>
   */
  async signUp(createUserInput: CreateUserInput): Promise<User> {
    try {
      const isExist = await this.findByEmail(createUserInput.email);
      if (isExist) {
        throw new BadRequestException('User already exist');
      } else {
        const user = this.userRepository.create(createUserInput);
        return await this.userRepository.save(user);
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * @param userCredentials
   */

  async signIn(userCredentials: UserCredentialInput) {
    const { password } = userCredentials;
    const user = await this.userRepository.findOneBy({
      email: userCredentials.email,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else {
      const match = await isMatch(password, user.password);
      if (!match) throw new UnauthorizedException('Password not match');
      else {
        delete user.password;
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

  /**
   * @param forgotPasswordInput
   * @returns
   */

  async forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
    const found = await this.findByEmail(forgotPasswordInput.email);
    if (!found) throw new UnauthorizedException('User not found');
    return tokenGenerator(100);
  }

  /**
   * @param changePasswordInput
   * @returns
   */

  async changePassword(changePasswordInput: ChangePasswordInput) {
    const user = await this.userRepository.findOneBy({
      email: changePasswordInput.email,
    });
    if (!user) throw new UnauthorizedException('User not found');
    if (changePasswordInput.password !== changePasswordInput.confirmPassword)
      throw new BadRequestException(
        'Password and confirm password should be same',
      );
    user.password = changePasswordInput.password;
    return await this.userRepository.save(user);
  }
  decodeAuthToken(authToken) {
    const payload = this.jwtService.decode(authToken);
    return payload;
  }
}
