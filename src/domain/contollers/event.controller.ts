import { Request, Response } from 'express';
import * as express from 'express';
import { userService } from '../../services/user.service';

const router = express.Router();

export async function eventController() {
    const userS = await userService();

    router.get('/', (req: Request, res: Response) => {
        userS.register({username: 'username', password: 'pass123'});
        res.json('sdq');
    });

    return router;
}
