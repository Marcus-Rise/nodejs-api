import {Router} from 'express';
import {container} from "../services/serviceContainer";
import {AuthLoginController, AuthLogoutController} from "../controllers/Auth";

const router = Router();

router.post('/login', (req, res) => container
    .resolve(AuthLoginController).execute(req, res));

router.get('/logout', (req, res) => container
    .resolve(AuthLogoutController).execute(req, res));

export default router;
