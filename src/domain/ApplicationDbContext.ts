import { Db, MongoClient, MongoError } from 'mongodb';
import { config } from '../config/config';

let _db;
const connect = (): Promise<Db> => {
    if (_db) {
        return new Promise((resolve, reject) => {
            resolve(_db);
        });
    }

    return new Promise((resolve, reject) => {
        MongoClient.connect(config.mongodb.local, (err: MongoError, db: Db) => {
            if (err) {
                reject(err);
            } else {
                _db = db;
                resolve(db);
            }
        });
    });
};

export { connect };
