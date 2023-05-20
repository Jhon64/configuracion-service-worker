"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepository = void 0;
const categorias_scheme_1 = require("./../schemes/maestros/categorias.scheme");
const base_repository_1 = require("./base.repository");
class CategoriaRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(categorias_scheme_1.CategoriaModel);
    }
    async findAll() {
        return await this._model.find().select('');
    }
    async registerUpdateMultiple(add) {
        try {
            const defaultValues = this.generarDefaultValues();
            const updatedValues = this.generarUpdateDefaultValues();
            const registrosBulk = [];
            console.log('registros::', add);
            for (let reg of add) {
                let itemReg = {};
                if (reg._id) {
                    itemReg = {
                        updateOne: {
                            update: { ...reg },
                            filter: { _id: reg._id },
                        },
                    };
                }
                else {
                    itemReg = { insertOne: { document: { ...reg, ...defaultValues } } };
                }
                console.log('registros bulk', itemReg);
                registrosBulk.push(itemReg);
            }
            const register = await this._model.bulkWrite(registrosBulk);
            console.log(register);
            return Array.isArray(register)
                ? register.map((x) => x._id).join(',')
                : register;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CategoriaRepository = CategoriaRepository;
