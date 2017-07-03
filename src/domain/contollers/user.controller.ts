import { Request, Response } from 'express';
import * as express from 'express';
import * as passport from 'passport';
import { userService } from '../../services/user.service';

const router = express.Router();

export async function userController() {
    const userS = await userService();

    async function serialize(req: Request, res: Response, next) {
        try {
            const user = await userS.getUser({ username: req.user.username });
            if (!user) {
                console.log('user not found');
                throw new Error('User not found');
            }

            req.user = {
                id: user._id,
                username: user.username,
            };
            next();
        } catch (error) {
            console.error(error);
        }
    }

    async function getnerateToken(req: Request, res: Response, next) {
        try {
            
        } catch (error) {
            
        }
    }

    router.get('/', (req: Request, res: Response) => {
        userS.register({ username: 'username', password: 'pass123' });
        res.json('sdq');
    });

    router.post('/auth', passport.authenticate('local', { session: false }), serialize, generateToken, respond);

    return router;
}
