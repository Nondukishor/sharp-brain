import { Router } from 'express';
import Users from './users';
const router = Router();
const userRouters = new Users();
router.use('/', userRouters);
