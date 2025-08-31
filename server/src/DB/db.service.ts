import { FilterQuery, Model, ProjectionType, QueryOptions, Types, UpdateQuery } from "mongoose";

export class DBService<T> {
    constructor(private _model:Model<T>) {}

    create(document: Partial<T>): Promise<T> {
        const newDocument = this._model.create(document);
        return newDocument;
    }

    find(filter: FilterQuery<T> = {}): Promise<Array<T>> {
        return this._model.find(filter);
    }

    findById(id: Types.ObjectId): Promise<T | null> {
        return this._model.findById(id);
    }

    findOne(filter: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions): Promise<T | null> {
        return this._model.findOne(filter, projection);
    }

    findByIdAndUpdate(id: Types.ObjectId, update?: UpdateQuery<T>, options?: QueryOptions): Promise<T | null> {
        return this._model.findByIdAndUpdate(id, update);
    }

    findByIdAndDelete(id: Types.ObjectId, options?: QueryOptions): Promise<T | null> {
        return this._model.findByIdAndDelete(id, options);
    }
};