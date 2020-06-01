import randomString from 'randomstring';
import jsonwebtoken, {Secret, SignOptions, VerifyErrors} from 'jsonwebtoken';
import {cookieProps} from '@shared/constants';
import {IClientData} from "@shared/IClientData";
import {IJwtService} from "../IJwtService";

export class JwtService implements IJwtService {
    private readonly secret: Secret;
    private readonly options: SignOptions;
    private readonly VALIDATION_ERROR = 'JSON-web-token validation failed.';

    constructor() {
        this.secret = (process.env.JWT_SECRET || randomString.generate(100));
        this.options = {expiresIn: cookieProps.options.maxAge.toString()};
    }

    public getJwt(data: IClientData): Promise<string> {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(data, this.secret, this.options, (err, token) => {
                err ? reject(err) : resolve(token);
            });
        });
    }

    public decodeJwt(jwt: string): Promise<IClientData> {
        return new Promise((res, rej) => {
            jsonwebtoken.verify(jwt, this.secret, (err: VerifyErrors | null, decoded?: object) => {
                return err ? rej(this.VALIDATION_ERROR) : res(decoded as IClientData);
            });
        });
    }
}
