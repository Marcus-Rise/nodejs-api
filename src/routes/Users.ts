import {Router} from 'express';
import {adminMW} from './middleware';
import {container} from "../services/serviceContainer";

// Init shared
const router = Router().use(adminMW);


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req, res) => {
    await import("@/controllers/User/UserGetAllController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

router.post('/add', async (req, res) => {
    await import("@/controllers/User/UserCreateController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

router.put('/update', async (req, res) => {
    await import("@/controllers/User/UserUpdateController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

router.delete('/delete/:id', async (req, res) => {
    await import("@/controllers/User/UserDeleteController")
        .then(async (module) => {
            await container
                .resolve(module.default).execute(req, res)
        });
});

export default router;
