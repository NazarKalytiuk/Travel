import * as bodyParser from 'body-parser';
import { Application, Response } from 'express';
import * as express from 'express';
import { flightController } from './domain/contollers/flights.controller';
import { tripsController } from './domain/contollers/trip.controller';

export class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    public async route() {
        this.app.use(await tripsController());

        return this.app.use(await flightController());
    }

    public listen(port: number = 3000, callback?: () => void) {
        return this.app.listen(port, callback);
    }

    private config() {
        this.app.use((req, res: Response, next) => {
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
}
