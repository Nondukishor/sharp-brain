import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepositoy: Repository<User>){}
    async findAll():Promise<User[]>{
     const user = new User()
     user.id =1 
     user.name="nipu"
     user.type="user"
     return [user]
    }
}
