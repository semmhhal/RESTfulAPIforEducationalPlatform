import cors from 'cors'; //This bypasses the security obstacles by adding neccesarry headers to responses to allow cross origin requests
import 'dotenv/config';
import morgan from 'morgan'; //logger
import helmet from 'helmet'; //adds security headers 
import fs from 'node:fs';
import express, { Request, Response, NextFunction } from 'express';
import userRouter from './users/user.route';
import { ErrorwithStatus } from './Generaltypes/errors';
import { connect_DB } from './db_connect';
import { checkandVerifyToken } from './Verifications/verifyToken';
import CoursesRouter from './courses/courses.router';




//Instantiations
const app = express();
connect_DB();
//Configs
app.set('Halo', 'halohowareyou');


//Middlewares

const environment = process.env.NODE_ENV || 'development';
if (environment === 'development') {
    // Log requests to the console in development
    app.use(morgan('dev'));
} else if (environment === 'production') {
    // Log requests to a file in production
    const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' }); // creating a file called access.log and "a" respresents appending the new file that has information.
    app.use(morgan('combined', { stream: accessLogStream }));
}
app.use(helmet());
app.use(cors());


//Routes
app.use('/users', userRouter);
app.use('/courses', checkandVerifyToken, CoursesRouter);


//Error Handling
app.all('*', (req, res, next) => { next(new Error('Route not found')); });

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorwithStatus) {
        res.status(err.status).send(err.message);
    }
    else if (err instanceof Error) {
        res.status(500).send(err.message);
    }
    else {
        res.status(500).send('An unknown error has occured');
    }
});


//bootup
app.listen(3000, () => console.log(`listening to port 3000`))

