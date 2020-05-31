import {IClientData} from "@shared/IClientData";

export interface IJwtService {
    /**
     * Encrypt data and return jwt.
     *
     * @param data
     */
    getJwt(data: IClientData): Promise<string>;

    /**
     * Decrypt JWT and extract client data.
     *
     * @param jwt
     */
    decodeJwt(jwt: string): Promise<IClientData>;
}
