import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';
import BaseRouter from './routes';

// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

export default app;
