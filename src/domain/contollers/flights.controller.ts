import { Request, Response } from 'express';
import * as express from 'express';
import { ObjectID } from 'mongodb';
import * as underscore from 'underscore';
import { Flight } from '../../model/flight';
import { flightService } from '../../services/flights.service';

const router = express.Router();

export async function flightController() {
    const flightServ = await flightService();

    router.get('/flights', async (req: Request, res: Response) => {
        try {
            const filter = req.query;
            const flights = await flightServ.getAllflights();
            if (flights) {
                const result = flights.filter(c => filter);

                return result ? res.json(result) : res.sendStatus(404);
            }
        } catch (error) {
            res.sendStatus(500);
        }
    });

    router.post('/flights', async (req: Request, res: Response) => {
        try {
            const flight: Flight = req.query;
            flight.cost = +flight.cost;
            const time = req.query.start.split(':');
            flight.start = +time[0] * 60 + (+time[1]);

            const result = await flightServ.createFlight(flight);

            return result ? res.json({}) : res.sendStatus(500);
        } catch (error) {
            console.error(error);

            return res.sendStatus(500);
        }
    });

    router.put('/flights', async (req: Request, res: Response) => {
        try {
            const filter = req.query;
            const flight = await flightServ.getFlight(filter);

            Object.assign(flight, filter);
            if (flight && req.query.start) {
                flight.cost = +flight.cost;
                const time = req.query.start.split(':');
                flight.start = +time[0] * 60 + (+time[1]);
            }

            const result = flight ? await flightServ.updateFlight(filter, flight) : undefined;

            return result ? res.json({}) : res.sendStatus(500);
        } catch (error) {
            console.error(error);

            return res.sendStatus(500);
        }
    });

    router.delete('/flights', async (req: Request, res: Response) => {
        try {
            const filter = req.query;
            const result = await flightServ.removeFlight(filter); // result 1 or undefined means that object does not exist

            return res.json({});
        } catch (error) {
            console.error(error);

            return res.sendStatus(500);
        }
    });

    /// test for autocomple city

    router.get('/cities', async (req, res) => {
        try {
            let flights: Flight[] | undefined = await flightServ.getAllflights();
            flights = flights ? flights : [];
            const cities = flights.map(c => c.origin); // потім бажано підбирати міста на основі вибраного пункту призначення чи відправки

            res.json(underscore.uniq(cities));
        } catch (error) {
            return res.sendStatus(500);
        }
    });


    router.get('/cities/dest', async (req, res) => {
        try {
            let flights: Flight[] | undefined = await flightServ.getAllflights();
            flights = flights ? flights : [];
            const cities = flights.map(c => c.destination); // потім бажано підбирати міста на основі вибраного пункту призначення чи відправки

            res.json(underscore.uniq(cities));
        } catch (error) {
            return res.sendStatus(500);
        }
    });

    return router;
}
