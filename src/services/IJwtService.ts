import {IClientData} from "@/models/IClientData";

export interface IJwtService {
    /**
     * Encrypt data and return jwt.
     *
     * @param data
     */
    encode(data: IClientData): Promise<string>;

    /**
     * Decrypt JWT and extract client data.
     *
     * @param jwt
     */
    decode(jwt: string): Promise<IClientData>;
}
