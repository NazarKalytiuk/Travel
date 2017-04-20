import { MongoClient, Db, Collection } from 'mongodb'
import { Event } from '../models/event';
import app = require("./../app")

export class AppDbContext {
    private _db: Db;
    constructor() {
    }
    connect(url: string = 'mongodb://localhost:27017/calendar') {
        MongoClient.connect(url, (err: Error, db: Db) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Connected to ${url}`);
            this._db = db;
        });
    }
    getCollection(name: string) {
        if(!this._db) {
            console.log(this._db)
        }
        if (!this._db.collection(name)) {
            this._db.createCollection(name);
        }
        return this._db.collection(name);
    }
}
