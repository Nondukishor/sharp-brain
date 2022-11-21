import { Router } from 'express';
import UserController from '../controller/UserController';
const users = Router();

users.get('/all', UserController.all);

export default users;
