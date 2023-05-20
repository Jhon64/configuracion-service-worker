"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuRepository = void 0;
const navegacion_scheme_1 = require("./../schemes/security/navegacion.scheme");
const navegacion_scheme_2 = require("../schemes/security/navegacion.scheme");
const base_repository_1 = require("./base.repository");
class SubMenuRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(navegacion_scheme_2.SubMenuModel);
        this._menuModel = navegacion_scheme_1.MenuModel;
    }
    async findAll() {
        return await this._model
            .find()
            .select('')
            .populate({
            path: 'menu',
            select: 'nombre _id',
        });
    }
    async registerUpdateMultiple(add) {
        try {
            const defaultValues = this.generarDefaultValues();
            const updatedValues = this.generarUpdateDefaultValues();
            const registrosBulk = [];
            console.log('regsitros::', add);
            for (let reg of add) {
                reg.menu = await this._menuModel.findById(reg.menuID);
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
    async register(add) {
        try {
            const defaultValues = this.generarDefaultValues();
            const newAdd = { ...add, ...defaultValues };
            const menuFind = await this._menuModel.findById(add.menu);
            if (!menuFind)
                throw 'Menu no disponible';
            newAdd.menu = menuFind;
            const register = await this._model.create(newAdd);
            return register._id;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SubMenuRepository = SubMenuRepository;
