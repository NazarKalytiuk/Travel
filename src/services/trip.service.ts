import { repositoryFactory } from '../domain/repositories/repository';
import { Flight } from '../model/flight';

async function tripService() {
    const flightR = await repositoryFactory<Flight>(Flight);

    async function getFlightsBeforeTime(time: number) {
        try {
            let flights = await flightR.getAll();
            flights = flights.filter(c => c.start + c.duration >= time);

            return flights;
        } catch (error) {
            console.error(error);
        }
    }

    async function getFlightsTo(city: string) {
        try {
            let flights = await flightR.getAll();
            flights = flights.filter(c => c.destination === city);

            return flights;
        } catch (error) {
            console.error(error);
        }
    }

    async function getFlightsToBeforeTime(city: string, time: number) {
        try {
            let flights = await flightR.getAll();
            flights = flights.filter(c => (c.destination === city && c.start + c.duration >= time));

            return flights;
        } catch (error) {
            console.error(error);
        }
    }

    return { getFlightsBeforeTime, getFlightsTo, getFlightsToBeforeTime };
}
export { tripService };
