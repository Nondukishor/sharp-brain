import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports:[ PassportModule, JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
    inject: [ConfigService],
  }),, TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver]
})
export class UserModule {}
