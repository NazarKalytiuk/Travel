import { Strategy } from 'passport-local';
import { userService } from '../services/user.service';

const LocalStrategy = new Strategy(
    async (username, password, done) => {
        try {
            const userS = await userService();
            let user = await userS.getUser({ username });

            if (!user) {
                user = await userS.register(username, password);

                return done(null, user);
            }
            const verify = await userS.verifyPassword(username, password);

            if (verify) {
                return done(null, user);
            } else {
                return done('Wrong password');
            }
        } catch (error) {
            return done(error);
        }
    },
);

export { LocalStrategy };
