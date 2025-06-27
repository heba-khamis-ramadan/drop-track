"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
class DBService {
    constructor(_model) {
        this._model = _model;
    }
    create(document) {
        const newDocument = this._model.create(document);
        return newDocument;
    }
    find(filter) {
        return this._model.find(filter || {});
    }
    findById(id) {
        return this._model.findById(id);
    }
    findOne(filter, projection, options) {
        return this._model.findOne(filter, projection);
    }
    findByIdAndUpdate(id, update, options) {
        return this._model.findByIdAndUpdate(id, update);
    }
}
exports.DBService = DBService;
;
