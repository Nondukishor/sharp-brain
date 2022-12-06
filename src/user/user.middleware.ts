import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private usersService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const sign = req.headers.authorization || '';
    if (!sign) throw new UnauthorizedException('Please provide bearer token');
    const payload = this.usersService.decodeAuthToken(
      sign.replace('Bearer ', ''),
    );
    next();
  }
}
