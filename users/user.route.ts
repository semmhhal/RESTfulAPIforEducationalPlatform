import express from 'express';
import { post_signup, post_signin } from './user.signupsignin.controller';
import pictureRouter from '../Pictures/pictures.route';
import { checkandVerifyToken } from '../Verifications/verifyToken';
// import CoursesRouter from '../courses/courses.router';
const userRouter = express.Router();


userRouter.post('/signup', express.json(), post_signup);
userRouter.post('/signin', express.json(), post_signin);

userRouter.use('/:user_id', checkandVerifyToken, pictureRouter);
// userRouter.use('/', CoursesRouter);

export default userRouter;