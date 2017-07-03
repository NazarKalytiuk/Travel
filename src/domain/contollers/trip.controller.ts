import { Request, Response } from 'express';
import * as express from 'express';
import { ObjectID } from 'mongodb';
import { Flight } from '../../model/flight';
import { Trip } from '../../model/trip';
import { tripService } from '../../services/trip.service';

const router = express.Router();

export async function tripsController() {
    const tripServ = await tripService();

    router.get('/trips', async (req: Request, res: Response) => {
        try {
            const origin = req.query.origin;
            const destination = req.query.destination;
            const efficiency = req.query.efficiency;
            const numberOfResults = +req.query.results;

            let allToDest = await tripServ.getFlightsTo(destination);
            allToDest = allToDest ? allToDest : [];
            const results = new Array<Trip>();

            allToDest.forEach(c => {
                if (c.destination === destination && c.origin === origin) {
                    const trip = new Trip();
                    trip.connections = 1;
                    trip.cost = c.cost;
                    trip.flights = trip.flights ? trip.flights : new Array();
                    // if (!trip.flights) {
                    //     trip.flights = new Array();
                    // }
                    trip.flights.push(c.id.toString());
                    trip.time = c.duration;
                    results.push(trip);
                }
            });

            // check readme

            // switch (efficiency) {
            //     case 'time':
            //         results = results.sort(c => c.time);
            //         break;
            //     case 'cost':
            //         results = results.sort(c => c.cost);
            //         break;
            //     case 'connections':
            //         results = results.sort(c => c.connections);
            //         break;
            //     default:
            //         break;
            // }
            results.sort(c => c[efficiency]).slice(0, numberOfResults);
            res.json(results);
        } catch (error) {
            res.sendStatus(500);
        }
    });

    return router;
}
