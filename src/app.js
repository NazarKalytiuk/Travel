const express = require('express');
const appRouter = require('./routers/app.router');
const ApplicationDbContext = require('./domain/dbContext');


(async() => {
    const server = express();
    server.use(appRouter);

    const db = await new ApplicationDbContext().connect();

    console.log('db', db);
    server.listen(3000, () => {
        console.log('Server has been started');
    });
})();
