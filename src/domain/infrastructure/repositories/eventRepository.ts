import { AppDbContext } from '../../appDbContext';
import { Repository } from "./repository";
import { Collection } from 'mongodb';
export class EventRepository extends Repository<EventRepository> {
    constructor(appDbContext : AppDbContext, collection : Collection) {
        super(appDbContext, collection);
    }
}