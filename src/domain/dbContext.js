const mongo = require('mongodb');
const config = require('../config/config');
/**
 *
 */
class ApplicationDbContext {
    /**
     *
     */
    constructor() {
        this.db = null;
    };
    /**
     *
     * @param {*} url
     * @return {Db} connection
     */
    connect(url = config.db.local) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
            }
            mongo.MongoClient.connect(url, (err, db) => {
                if (err) {
                    reject('Not Connected');
                };
                this.db = db;
                resolve(db);
            });
        });
    };
};

module.exports = ApplicationDbContext;
