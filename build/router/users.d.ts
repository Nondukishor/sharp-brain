import { Request, Response } from 'express';
export default class Users {
    all(req: Request, res: Response): Promise<void>;
}
