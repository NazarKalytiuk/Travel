import { OAuth2Strategy } from 'passport-google-oauth';
import { config } from '../config/config';
import { userService } from '../services/user.service';

const GoogleStrategy = new OAuth2Strategy({
    callbackURL: 'http://localhost:3000/auth/google/callback',
    clientID: config.googleCredentials.clientID,
    clientSecret: config.googleCredentials.clientSecret,
    // tslint:disable-next-line:align
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userS = await userService();
        if (profile && profile.emails && profile.emails[0] && profile.emails[0].value) {
            let user = await userS.getUser({ username: profile.emails[0].value });
            if (!user) {
                user = await userS.registerExternal(profile.emails[0].value, { googleId: profile.id });
            }

            return done(null, user);
        }
    } catch (error) {
        console.error(error);
    }
});

export { GoogleStrategy };
