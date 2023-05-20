"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const fechas_1 = require("../helpers/fechas");
class BaseRepository {
    constructor(model) { this._model = model; }
    generarDefaultValues(usuarioID) {
        const values = {
            createdAt: (0, fechas_1.getFechaUnix)(),
            updatedAt: (0, fechas_1.getFechaUnix)(),
            isDeleted: false,
            status: true,
            createUserID: usuarioID || 1,
            updateUserID: usuarioID || 1
        };
        return values;
    }
    generarUpdateDefaultValues(usuarioID, status, deleted) {
        const values = {
            updatedAt: (0, fechas_1.getFechaUnix)(),
            isDeleted: deleted ? deleted : false,
            status: status ? status : true,
            updateUserID: usuarioID ? usuarioID : 1
        };
        return values;
    }
    async findAll() {
        try {
            const findAll = await this._model.find({ isDeleted: false });
            return findAll;
        }
        catch (error) {
            throw error;
        }
    }
    async findByID(_id) {
        try {
            const find = await this._model.findById(_id);
            return find;
        }
        catch (error) {
            throw error;
        }
    }
    async register(add) {
        try {
            const defaultValues = this.generarDefaultValues();
            const newAdd = { ...add, ...defaultValues };
            const register = await this._model.create(newAdd);
            return register._id;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(_id) {
        try {
            const register = await this._model.updateOne({}, { _id, isDeleted: true, status: false });
            return register.modifiedCount > 0 ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAll() {
        try {
            const register = await this._model.updateMany({}, { isDeleted: true, status: false });
            console.log('eliminados::', register);
            return register.modifiedCount > 0 ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BaseRepository = BaseRepository;
