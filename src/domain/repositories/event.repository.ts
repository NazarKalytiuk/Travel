import { Event } from '../../model/event';
import { connect } from '../ApplicationDbContext';

const getAll = async () => {
    const db = await connect();

    return db.collection('Events').find().toArray();
};
const get = async (filter: Event): Promise<Event> => {
    const db = await connect();

    return db.collection('Events').findOne(filter);
};

const eventRepository = {
    get,
    getAll,
};

export { eventRepository };
