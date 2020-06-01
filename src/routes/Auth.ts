import {Router} from 'express';
import {container} from "../services/serviceContainer";
import {AuthLoginController, AuthLogoutController} from "../controllers/Auth";
import {AuthRegisterController} from "@/controllers/Auth/AuthRegisterController";

const router = Router();

router.post('/register', (req, res) => container
    .resolve(AuthRegisterController).execute(req, res));

router.post('/login', (req, res) => container
    .resolve(AuthLoginController).execute(req, res));

router.get('/logout', (req, res) => container
    .resolve(AuthLogoutController).execute(req, res));

export default router;
