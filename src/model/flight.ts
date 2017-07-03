import { ObjectID } from 'mongodb';

export class Flight {
    public _id: ObjectID;
    public id: number;
    public start: number; // in minutes
    public duration: number; // in minutes
    public origin: string;
    public destination: string;
    public cost: number; // in $
}
