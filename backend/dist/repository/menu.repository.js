"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRepository = void 0;
const navegacion_scheme_1 = require("./../schemes/security/navegacion.scheme");
const base_repository_1 = require("./base.repository");
class MenuRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(navegacion_scheme_1.MenuModel);
        this._submenu = navegacion_scheme_1.SubMenuModel;
    }
    async findAll() {
        return await this._model.find().select('');
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
    async registerMultiple(add) {
        try {
            const defaultValues = this.generarDefaultValues();
            const registros = [];
            console.log('regsitros::', add);
            for (let reg of add) {
                const newAdd = { ...reg, ...defaultValues };
                registros.push(newAdd);
            }
            const register = await this._model.create(registros);
            console.log(register);
            return Array.isArray(register)
                ? register.map((x) => x._id).join(',')
                : register;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllDetails() {
        const menu = await this._model.find().select('').where('isDeleted').equals(false);
        for (let _menu of menu) {
            const submenus = await this._submenu
                .find({ menu: _menu._id })
                .select('');
            _menu.submenus = submenus;
        }
        return menu;
    }
}
exports.MenuRepository = MenuRepository;
