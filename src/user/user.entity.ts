import 'moment-timezone';
import 'class-transformer';
import * as moment from 'moment';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  // AfterLoad,
} from 'typeorm';
import { IsEmail } from 'class-validator';
// import { InternalServerErrorException } from '@nestjs/common';

@Entity()
@ObjectType()
export class User {
  // private tempPassword: string;
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @IsEmail()
  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @AfterLoad()
  // private loadTempPassword(): void {
  //   this.tempPassword = this.password;
  // }

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword(): Promise<void> {
  //   if (this.tempPassword !== this.password) {
  //     try {
  //       this.password = await bcrypt.hash(this.password, 10);
  //     } catch (e) {
  //       throw new InternalServerErrorException(
  //         'New password and old password cannot be same',
  //       );
  //     }
  //   }
  // }

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
    this.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }
}
