import { Request, Response } from 'express';

export default class UserController {
  static async all(req: Request, res: Response) {
    return res.json({
      message: 'Users',
    });
  }
}
