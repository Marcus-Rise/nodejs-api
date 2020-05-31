import {Router} from 'express';
import {adminMW} from './middleware';
import {container} from "../services/serviceContainer";
import {
    UserCreateController,
    UserDeleteController,
    UserGetAllController,
    UserUpdateController
} from "../controllers/User";


// Init shared
const router = Router().use(adminMW);


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', (req, res) => container
    .resolve(UserGetAllController).execute(req, res));

router.post('/add', (req, res) => container
    .resolve(UserCreateController).execute(req, res));

router.put('/update', (req, res) => container
    .resolve(UserUpdateController).execute(req, res));

router.delete('/delete/:id', (req, res) => container
    .resolve(UserDeleteController).execute(req, res));

export default router;
