"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaService = void 0;
const categoria_repository_1 = require("./../repository/categoria.repository");
class CategoriaService {
    constructor() {
        this._repository = new categoria_repository_1.CategoriaRepository();
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
exports.CategoriaService = CategoriaService;
