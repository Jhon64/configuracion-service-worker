"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcasService = void 0;
const marcas_repository_1 = require("../repository/marcas.repository");
class MarcasService {
    constructor() {
        this._repository = new marcas_repository_1.MarcaRepository();
    }
    async findAll() {
        return await this._repository.findAll();
    }
    async create(add) {
        return await this._repository.registerUpdateMultiple(add);
    }
    async deleteAll() {
        return await this._repository.deleteAll();
    }
}
exports.MarcasService = MarcasService;
