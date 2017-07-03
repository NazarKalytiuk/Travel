import { DeleteWriteOpResultObject, InsertOneWriteOpResult, MongoCallback, MongoError, UpdateWriteOpResult } from 'mongodb';
import { connect } from '../ApplicationDbContext';
import { IRepository } from './IRepository';

/**
 * @desc create a generic repository
 * @param T Type
 * @example const repository = await repositoryFactory<Class>(Class);
 * @return {Promise<IRepository<T>>}
 */
export async function repositoryFactory<T>(T): Promise<IRepository<T>>;
/**
 * @desc create a generic repository
 * @param T Type
 * @callback cb repository<T>
 * @example repositoryFactory<Class>(Class, repository => {// get repository here});
 */
export async function repositoryFactory<T>(T, cb?: (repository: IRepository<T>) => void): Promise<void>;
export async function repositoryFactory<T>(T, cb?: (repository: IRepository<T>) => void): Promise<IRepository<T> | void> {
    const db = await connect();
    const collection = db.collection(T.name);

    /**
     * @desc getAll objects from db
     * @return {Promise<T[]} return objects
     * @example const objects = await repository.getAll();
     */
    async function getAll(filter?): Promise<T[]>;
    /**
     * @desc getAll objects from db
     * @callback function (err, docs: T[])
     * @example repository.getAll((err, docs) => {// get err and docs here});
     */
    async function getAll(filter, callback: (err: Error, docs: T[]) => void): Promise<void>;
    async function getAll(filter, callback?: (err?: Error, docs?: T[]) => void): Promise<void | T[]> {
        return callback ? collection.find<T>(filter).toArray(callback) : collection.find<T>(filter).toArray();
    }

    /**
     * @desc get single object from db
     * @param filter object for search
     * @return {Promise<T>} return object
     * @example const object = await repository.get({_id: '1'});
     */
    async function get(filter): Promise<T>;
    /**
     * @desc get single object from db
     * @param filter object for search
     * @example repositpry.get({_id: '1'}, (err, object) => {// get err and object here});
     * @callback function (err, result: string) => {} result wii be item
     */
    async function get(filter, callback: (err: Error, doc: T) => void): Promise<void>;
    async function get(filter, callback?: (err?: Error, doc?: T) => void): Promise<void | T> {
        return callback ? collection.findOne<T>(filter, callback) : collection.findOne<T>(filter);
    }
    /**
     * @desc insert single object to db
     * @param {T} item object for insert
     * @example const result = await repository.create(item);
     * @return {Promise<string>} return id of inserted object
     */
    async function create(item: T): Promise<string>;
    /**
     * @desc insert single object to db
     * @param {T} item object for insert
     * @callback function (err, result) => {} result will be id of inserted item
     * @example repository.create(item, (err, result) => {// result will be id of inserted item})
     * @return {void}
     */
    async function create(item: T, callback: (err: Error, result: string) => void): Promise<void>;
    async function create(item: T, callback?: (err?: Error, result?: string) => void): Promise<string | void> {
        if (callback) {
            return collection.insertOne(item, (err: Error, res: InsertOneWriteOpResult) => callback(err, res.insertedId.toHexString()));
        }
        const result = await collection.insertOne(item);

        return result.insertedId.toHexString();
    }

    /**
     * @desc update single object
     * @param filter object for search
     * @param item object to update
     * @return {Promise<number>} number of updated objects
     * @example await repository.update({_id: '1'}, object);
     */
    async function update(filter, item: T): Promise<number>;
    /**
     * @desc update single object
     * @param filter object for search
     * @param item object to update
     * @callback function (err, result) => {//result will be number of updated objects}
     * @return {void}
     */
    async function update(filter, item: T, callback: (err: Error, result: number) => void): Promise<void>;
    async function update(filter, item: T, callback?: (err?: Error, result?: number) => void): Promise<number | void> {
        if (callback) {
            return collection.updateOne(filter, item, (err: Error, res: UpdateWriteOpResult) => callback(err, res.modifiedCount));
        }
        const result = await collection.updateOne(filter, item);

        return result.modifiedCount;
    }

    /**
     * @desc delete object from db
     * @param filter object for search
     * @example const result = await repository.remove({_id: '1'});
     * @return {number} number of deleted items
     */
    async function remove(filter): Promise<number>;
    /**
     * @desc delete object from db
     * @param filter object for search
     * @example repository.remove({_id: '1'}, (err, result) => {result will be number of deleted objects});
     * @return {void}
     */
    async function remove(filter, callback: (err: Error, result: number) => void): Promise<void>;
    async function remove(filter, callback?: (err?: Error, result?: number) => void): Promise<number | void> {
        if (callback) {
            return collection.deleteOne(filter, (err: Error, res: DeleteWriteOpResultObject) => callback(err, res.deletedCount));
        }
        const result = await collection.deleteOne(filter);

        return result.deletedCount;
    }

    const repository: IRepository<T> = {
        create,
        get,
        getAll,
        remove,
        update,
    };

    return cb ? cb(repository) : repository;
}
