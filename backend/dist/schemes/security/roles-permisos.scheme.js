"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmenusRolesModel = exports.SubmenusRolesScheme = exports.RolModel = exports.RolScheme = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../database/mongoDB");
const base_scheme_1 = require("../base.scheme");
exports.RolScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    nombre: { type: String, required: true },
});
exports.RolModel = mongoDB_1.MongoDB.getInstance._connection.model('Rol', exports.RolScheme);
exports.SubmenusRolesScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    submenuID: { type: mongoose_1.Types.ObjectId, ref: 'SubMenu' },
    rolID: { type: mongoose_1.Types.ObjectId, ref: 'Rol' },
});
exports.SubmenusRolesModel = mongoDB_1.MongoDB.getInstance._connection.model('SubMenuRoles', exports.SubmenusRolesScheme);
