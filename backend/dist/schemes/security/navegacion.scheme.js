"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuModel = exports.SubMenuScheme = exports.MenuModel = exports.MenuScheme = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../database/mongoDB");
const base_scheme_1 = require("../base.scheme");
exports.MenuScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    route: { type: String, required: true },
    nombre: { type: String, required: true },
    class: { type: String, default: '' },
    css: { type: String, default: '' },
    icono: { type: String, default: '' },
    shortNombre: { type: String, default: '' },
    modulo: { type: String, default: '' },
    orden: { type: Number },
    submenus: { type: (Array) },
});
exports.MenuModel = mongoDB_1.MongoDB.getInstance._connection.model('Menu', exports.MenuScheme);
exports.SubMenuScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    route: { type: String, required: true },
    nombre: { type: String, required: true },
    class: { type: String },
    css: { type: String },
    icono: { type: String },
    shortNombre: { type: String },
    modulo: { type: String },
    orden: { type: Number },
    menu: { type: mongoose_1.Types.ObjectId, ref: "Menu", required: true }
});
exports.SubMenuModel = mongoDB_1.MongoDB.getInstance._connection.model('SubMenu', exports.SubMenuScheme);
