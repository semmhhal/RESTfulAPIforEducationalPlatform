import express from 'express';
import { post_lecture, get_lecture, update_lecture, delete_lecture } from './lecture.controller';
const lectureRouter = express.Router({ mergeParams: true });


lectureRouter.post('/', express.json(), post_lecture);
lectureRouter.get('/', get_lecture);
lectureRouter.put('/:lecture_id', express.json(), update_lecture);
lectureRouter.delete('/:lecture_id', delete_lecture);

export default lectureRouter;