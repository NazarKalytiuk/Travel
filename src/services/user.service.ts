import * as hash from 'password-hash';
import { repositoryFactory } from '../domain/repositories/repository';
import * as userRepository from '../domain/repositories/user.repository';
import { User } from '../model/user';

async function userService() {
    const userRepository = await repositoryFactory<User>(User);

    async function getAllUsers() {
        try {
            const users = await userRepository.getAll();

            return users;
        } catch (error) {
            console.error(error);
        }
    }

    async function getUser(filter) {
        try {
            const user = await userRepository.get(filter);

            return user;
        } catch (error) {
            console.error(error);
        }
    }

    async function verifyPassword(username, password) {
        try {
            const user = await userRepository.get({ username });

            return hash.verify(password, user.password);
        } catch (error) {
            console.error(error);
        }
    }

    async function register(model: { username; password }): Promise<User | undefined> {
        try {
            const user = await userRepository.get({ username: model.username });
            if (!user) {
                const newUser = new User();
                newUser.username = model.username;
                newUser.password = hash.generate(model.password);
                const result = await userRepository.create(newUser);

                return newUser;
            }

            return user;
        } catch (error) {
            console.error(error);
        }
    }

    return { getUser, getAllUsers, register, verifyPassword };
}
export { userService };
