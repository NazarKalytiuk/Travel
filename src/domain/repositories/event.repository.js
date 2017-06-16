const ApplicationDbContext = require('../dbContext');
/**
 *
 */
class EventRepository {
    /**
     *
     */
    constructor() {
        this.db = new ApplicationDbContext().db;
    };
    /**
     * @return {Array} elements
     */
    async getAll() {
        return this.db.collection('Events').find().toArray();
    };
    /**
     *
     * @param {Event} obj
     * @return {Event} event
     */
    async get(obj) {
        return this.db.collection('Events').findOne(obj);
    };
    /**
     *
     * @param {Event} obj
     * @return {Promise}
     */
    async delete(obj) {
        return this.db.collection('Events').deleteOne(obj);
    };
    /**
     *
     * @param {Event} filter
     * @param {Event} update
     * @return {Promise}
     */
    async update(filter, update) {
        return this.db.collection('Events').updateOne(filter, update);
    };
};

module.exports = EventRepository;
