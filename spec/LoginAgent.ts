import bcrypt from 'bcrypt';
import {SuperTest, Test} from 'supertest';
import {User} from '@/entities/User.entity';
import {pwdSaltRounds} from '@/shared/constants';
import {UserRoles} from "@/entities/UserRoles";
import {mock} from "jest-mock-extended";
import {IUserRepository} from "@/repositories/User/IUserRepository";
import {container} from "@/services/serviceContainer";

const creds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
};

export const login = (beforeAgent: SuperTest<Test>, done: any) => {
    const userRepositoryMock = mock<IUserRepository>();
    const loginUser = new User(
        'john smith',
        creds.email,
        UserRoles.Admin,
        bcrypt.hashSync(creds.password, pwdSaltRounds),
    );

    userRepositoryMock.findOne.mockResolvedValueOnce(loginUser);

    container.register("IUserRepository", {
        useValue: userRepositoryMock,
    });

    beforeAgent
        .post('/api/auth/login')
        .send(creds)
        .end((err: Error, res: any) => {
            if (err) {
                throw err;
            }
            done(res.headers['set-cookie']);
        });
};
