"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const menu_repository_1 = require("../repository/menu.repository");
class MenuService {
    constructor() {
        this._repository = new menu_repository_1.MenuRepository();
    }
    async findAll() {
        return await this._repository.findAllDetails();
    }
    async create(add) {
        return await this._repository.registerUpdateMultiple(add);
    }
    async deleteAll() {
        return await this._repository.deleteAll();
    }
}
exports.MenuService = MenuService;
