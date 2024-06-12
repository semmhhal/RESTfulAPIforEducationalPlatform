import express from 'express';

import { post_course, get_allowncourses, get_course, put_course, delete_course } from './courses.controller';
import lectureRouter from '../lecture/lecture.routes';
const CoursesRouter = express.Router();

CoursesRouter.post('/', express.json(), post_course);
CoursesRouter.get('/', get_allowncourses);
CoursesRouter.get('/:course_id', get_course);
CoursesRouter.delete('/:course_id', delete_course);
CoursesRouter.put('/:course_id', express.json(), put_course);



CoursesRouter.use('/:course_id/lectures', lectureRouter);
export default CoursesRouter;