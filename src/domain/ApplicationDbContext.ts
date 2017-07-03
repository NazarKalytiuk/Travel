import { Db, MongoClient, MongoError } from 'mongodb';
import { config } from '../config/config';

let _db: Db;
/**
 * @description connect to mongodb
 * @param {string} url optional connection string (default from config file)
 * @returns {Promise<Db>} return Promise<Db>
 */
async function connect(url?: string): Promise<Db>;
/**
 * @description connect to mongodb
 * @param {string} url optional connection string (default from config file)
 * @callback callback with error and db
 * @returns {void}
 */
async function connect(url?: string, callback?: (err?: MongoError, db?: Db) => void): Promise<void>;
async function connect(url: string = config.mongodb.remote, callback?: (err?: MongoError, db?: Db) => void): Promise<Db | void> {
    if (callback) {
        if (_db) {
            return callback(undefined, _db);
        }
        MongoClient.connect(url, (err: MongoError, db: Db) => {
            _db = db;

            return callback(err, db);
        });
    }

    return new Promise<Db>((resolve: (value?: Db | PromiseLike<Db> | undefined) => void, reject: (reason?: MongoError) => void) => {
        if (_db) {
            return resolve(_db);
        }
        MongoClient.connect(url, (err: MongoError, db: Db) => {
            console.log('connecting');
            if (err) {
                return reject(err);
            } else {
                _db = db;

                return resolve(db);
            }
        });
    });
}

export { connect };

connect();
