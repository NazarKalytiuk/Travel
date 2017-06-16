const express = require('express');
const appRouter = require('./routers/app.router');


const server = express();
server.use(appRouter);

server.listen(3000, () => {
    console.log('Server has been started');
});
