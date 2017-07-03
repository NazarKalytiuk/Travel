import { Server } from './server';

(async () => {
    const server: Server = new Server();
    await server.route();
    server.listen();
})();
