"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuService = void 0;
const submenu_repository_1 = require("./../repository/submenu.repository");
class SubMenuService {
    constructor() {
        this._repository = new submenu_repository_1.SubMenuRepository();
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
exports.SubMenuService = SubMenuService;
