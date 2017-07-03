import { repositoryFactory } from '../domain/repositories/repository';
import { Flight } from '../model/flight';

async function flightService() {
    const flightR = await repositoryFactory<Flight>(Flight);

    async function getAllflights() {
        try {
            const flights = await flightR.getAll();

            return flights;
        } catch (error) {
            console.error(error);
        }
    }

    async function getFlight(filter) {
        try {
            const flight = await flightR.get(filter);

            return flight;
        } catch (error) {
            console.error(error);
        }
    }

    async function createFlight(item: Flight) {
        try {
            const result = await flightR.create(item);

            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async function updateFlight(filter, obj: Flight) {
        try {
            const result = await flightR.update(filter, obj);

            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async function removeFlight(filter) {
        try {
            const result = await flightR.remove(filter);

            return result;
        } catch (error) {
            console.error(error);
        }
    }

    return { getAllflights, getFlight, createFlight, updateFlight, removeFlight };
}
export { flightService };
