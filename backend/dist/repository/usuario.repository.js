"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const usuario_scheme_1 = require("../schemes/security/usuario.scheme");
const base_repository_1 = require("./base.repository");
class UsuarioRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(usuario_scheme_1.UsuarioModel);
    }
    async login(credenciales) {
        try {
            const find = await this._model.findOne({
                username: credenciales.username,
                password: credenciales.password,
                isDeleted: false
            });
            if (!find)
                throw `credenciales invalidas [${JSON.stringify(credenciales)}]`;
            return find;
        }
        catch (error) {
            throw error;
        }
    }
    async registerUpdateMultiple(add) {
        try {
            const defaultValues = this.generarDefaultValues();
            const updatedValues = this.generarUpdateDefaultValues();
            const registrosBulk = [];
            console.log('regsitros::', add);
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
exports.UsuarioRepository = UsuarioRepository;
