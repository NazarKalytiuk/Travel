// @DEPRECATED see repository.ts
import { DeleteWriteOpResultObject, InsertOneWriteOpResult, MongoCallback, MongoError, UpdateWriteOpResult } from 'mongodb';
import { connect } from '../ApplicationDbContext';

export interface IRepository<T> {
    getAll(): Promise<T[]>;
    getAll(callback: (err?: MongoError, docs?: T[]) => void): Promise<void>;

    get(filter): Promise<T>;
    get(filter, callback: (err?: MongoError, doc?: T) => void): Promise<void>;

    create(item: T): Promise<InsertOneWriteOpResult>;
    create(item: T, callback: (err?: MongoError, result?: InsertOneWriteOpResult) => void): Promise<void>;

    update(filter, item: T): Promise<UpdateWriteOpResult>;
    update(filter, item: T, callback: (err?: MongoError, result?: UpdateWriteOpResult) => void);

    remove(filter): Promise<DeleteWriteOpResultObject>;
    remove(filter, callback: (err?: MongoError, result?: DeleteWriteOpResultObject) => void): Promise<void>;
}

export async function repositoryFactory<T>(T): Promise<IRepository<T>>;
export async function repositoryFactory<T>(T, cb?: (repository: IRepository<T>) => void): Promise<void>;
export async function repositoryFactory<T>(T, cb?: (repository: IRepository<T>) => void): Promise<IRepository<T> | void> {
    const db = await connect();
    const collection = db.collection(T.name);

    async function getAll(): Promise<T[]>;
    async function getAll(callback: (err: MongoError, docs: T[]) => void): Promise<void>;
    async function getAll(callback?: (err?: MongoError, docs?: T[]) => void): Promise<void | T[]> {
        return callback ? collection.find().toArray(callback) : collection.find().toArray();
    }

    async function get(filter): Promise<T>;
    async function get(filter, callback: (err: MongoError, doc: T) => void): Promise<void>;
    async function get(filter, callback?: (err?: MongoError, doc?: T) => void): Promise<void | T> {
        return callback ? collection.findOne(filter, callback) : collection.findOne(filter);
    }

    async function create(item: T): Promise<InsertOneWriteOpResult>;
    async function create(item: T, callback: (err?: MongoError, result?: InsertOneWriteOpResult) => void): Promise<void>;
    async function create(item: T, callback?: (err?: MongoError, result?: InsertOneWriteOpResult) => void): Promise<InsertOneWriteOpResult | void> {
        return callback ? collection.insertOne(item, callback) : collection.insertOne(item);
    }

    async function update(filter, item: T): Promise<UpdateWriteOpResult>;
    async function update(filter, item: T, callback: (err?: MongoError, result?: UpdateWriteOpResult) => void): Promise<void>;
    async function update(filter, item: T, callback?: (err?: MongoError, result?: UpdateWriteOpResult) => void): Promise<UpdateWriteOpResult | void> {
        return callback ? collection.updateOne(filter, item, callback) : collection.updateOne(filter, item);
    }

    async function remove(filter): Promise<DeleteWriteOpResultObject>;
    async function remove(filter, callback: (err?: MongoError, result?: DeleteWriteOpResultObject) => void): Promise<void>;
    async function remove(filter, callback?: (err?: MongoError, result?: DeleteWriteOpResultObject) => void): Promise<DeleteWriteOpResultObject | void> {
        return callback ? collection.deleteOne(filter, callback) : collection.deleteOne(filter);
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
