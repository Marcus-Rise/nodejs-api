import {Router} from 'express';
import {container} from "../services/serviceContainer";

const router = Router();

router.post('/register', async (req, res) => {
    await import("@/controllers/Auth/AuthRegisterController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

router.post('/login', async (req, res) => {
    await import("@/controllers/Auth/AuthLoginController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

router.get('/logout', async (req, res) => {
    await import("@/controllers/Auth/AuthLogoutController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

export default router;
