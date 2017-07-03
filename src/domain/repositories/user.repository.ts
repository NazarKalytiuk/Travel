import { Db, DeleteWriteOpResultObject, InsertOneWriteOpResult, MongoError, UpdateWriteOpResult } from 'mongodb';
import { User } from '../../model/user';
import { connect } from '../ApplicationDbContext';

async function getAll(): Promise<User[]>;
async function getAll(callback: (err?: MongoError, docs?: User[]) => void): Promise<void>;
async function getAll(callback?: (err?: MongoError, docs?: User[]) => void): Promise<void | User[]> {
    const db = await connect();
    if (callback) {
        return db.collection('Users').find().toArray(callback);
    } else {
        return db.collection('Users').find().toArray();
    }
}

async function get(filter: User): Promise<User>;
async function get(filter: User, callback: (err?: MongoError, doc?: User) => void): Promise<void>;
async function get(filter: User, callback?: (err?: MongoError, doc?: User) => void): Promise<User | void> {
    const db = await connect();
    if (callback) {
        db.collection('Users').findOne(filter, callback);
    } else {
        return db.collection('Users').findOne(filter);
    }
}

async function create(user: User): Promise<InsertOneWriteOpResult>;
async function create(user: User, callback: (err?: MongoError, result?: InsertOneWriteOpResult) => void): Promise<void>;
async function create(user: User, callback?: (err?: MongoError, result?: InsertOneWriteOpResult) => void): Promise<InsertOneWriteOpResult | void> {
    const db = await connect();
    if (callback) {
        db.collection('Users').insertOne(user, callback);
    } else {
        return db.collection('Users').insertOne(user);
    }
}

async function update(filter: User, user: User): Promise<UpdateWriteOpResult>;
async function update(filter: User, user: User, callback: (err?: MongoError, result?: UpdateWriteOpResult) => void): Promise<void>;
async function update(filter: User, user: User, callback?: (err?: MongoError, result?: UpdateWriteOpResult) => void): Promise<UpdateWriteOpResult | void> {
    const db = await connect();
    if (callback) {
        db.collection('Users').updateOne(filter, user, callback);
    } else {
        return db.collection('Users').updateOne(filter, user);
    }
}

async function remove(filter: User): Promise<DeleteWriteOpResultObject>;
async function remove(filter: User, callback: (err?: MongoError, result?: DeleteWriteOpResultObject) => void): Promise<void>;
async function remove(filter: User, callback?: (err?: MongoError, result?: DeleteWriteOpResultObject) => void): Promise<DeleteWriteOpResultObject | void> {
    const db = await connect();
    if (callback) {
        db.collection('Users').deleteOne(filter, callback);
    } else {
        return db.collection('Users').deleteOne(filter);
    }
}

export { create, get, getAll, remove, update };
