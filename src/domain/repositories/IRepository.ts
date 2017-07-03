export interface IRepository<T> {
    getAll(filter?): Promise<T[]>;
    getAll(filter, callback: (err?: Error, docs?: T[]) => void): Promise<void>;

    get(filter): Promise<T>;
    get(filter, callback: (err?: Error, doc?: T) => void): Promise<void>;

    create(item: T): Promise<string>;
    create(item: T, callback: (err?: Error, result?: string) => void): Promise<void>;

    update(filter, item: T): Promise<number>;
    update(filter, item: T, callback: (err?: Error, result?: number) => void);

    remove(filter): Promise<number>;
    remove(filter, callback: (err?: Error, result?: number) => void): Promise<void>;
}
