import { MongoClient, Db, Collection } from 'mongodb'
import { Event } from '../models/event';
import app = require("./../app")

export class AppDbContext {
    private _db : Db;
    constructor() {
        MongoClient.connect('mongodb://localhost:27017/calendar', (err : string, database : Db) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('connected to db!')
            this._db = database;
        });
    }
    get Events() : Collection {
        return this._db.collection('Events');
    }
}
