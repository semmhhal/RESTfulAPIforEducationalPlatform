import express from 'express';
import multer from 'multer';
import { post_picture, deactivate_user, delete_picture } from './pictures.controller';
const pictureRouter = express.Router({ mergeParams: true });
const upload = multer({ dest: 'picture/' });


pictureRouter.post('/picture', upload.single('myfile'), post_picture);
pictureRouter.delete('/picture', delete_picture);
pictureRouter.patch('/', deactivate_user);


export default pictureRouter;