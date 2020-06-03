import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';
import {useContainer, useExpressServer} from "routing-controllers";
import {container} from "@/services/serviceContainer";
import {IoCAdapterImpl} from "@/IoCAdapter";

useContainer(new IoCAdapterImpl(container));

const app = express();

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

export default useExpressServer(app, {
    controllers: [__dirname + "/controllers/**/*.{ts,js}"],
    middlewares: [__dirname + "/middlewares/**/*.{ts,js}"],
    routePrefix: "/api",
    defaultErrorHandler: false,
});
