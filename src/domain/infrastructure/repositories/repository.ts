import { AppDbContext } from '../../appDbContext';
import { Collection } from 'mongodb';
export class Repository<T> {
    constructor(private appDbContext : AppDbContext, private collection : Collection) {
    }
}