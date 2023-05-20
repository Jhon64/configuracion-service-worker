"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaModel = exports.CategoriaScheme = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../database/mongoDB");
const base_scheme_1 = require("../base.scheme");
exports.CategoriaScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false }
});
exports.CategoriaModel = mongoDB_1.MongoDB.getInstance._connection.model('Categoria', exports.CategoriaScheme);
