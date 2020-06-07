import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';
import {Action, useContainer, useExpressServer} from "routing-controllers";
import {container} from "@/services/serviceContainer";
import {IoCAdapterImpl} from "@/IoCAdapter";
import {cookieProps} from "@/shared/constants";
import {IJwtService} from "@/services/IJwtService";
import User from "@/entities/User.entity";
import {IUserRepository} from "@/repositories/User/IUserRepository";

useContainer(new IoCAdapterImpl(container));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

export default useExpressServer(app, {
    authorizationChecker: async (action: Action, roles: string[]): Promise<boolean> => {
        let res: boolean = false;
        const jwt = action.request.signedCookies[cookieProps.key];

        if (jwt) {
            const jwtService = container.resolve<IJwtService>("IJwtService");
            const clientData = await jwtService.decode(jwt);

            res = clientData.roles && (!roles.length || roles.some(role => clientData.roles.includes(role)));
        }

        return res;
    },
    currentUserChecker: async (action: Action): Promise<User | undefined> => {
        let res: User | undefined;

        const jwt = action.request.signedCookies[cookieProps.key];

        if (jwt) {
            const repository = container.resolve<IUserRepository>("IUserRepository");
            const jwtService = container.resolve<IJwtService>("IJwtService");

            const clientData = await jwtService.decode(jwt);
            res = await repository.findOne({id: clientData.id})
        }

        return res;
    },
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/**/*.{ts,js}"],
    middlewares: [__dirname + "/middlewares/**/*.{ts,js}"],
});
