import * as express from 'express';
import { Application, Router } from 'express';
import { connect } from './domain/ApplicationDbContext';

(async () => {
    const db = await connect();
    const db2 = await connect();
    const server: Application = express();

})();
