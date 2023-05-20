"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcaModel = exports.MarcaScheme = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../database/mongoDB");
const base_scheme_1 = require("../base.scheme");
exports.MarcaScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false }
});
exports.MarcaModel = mongoDB_1.MongoDB.getInstance._connection.model('Marcas', exports.MarcaScheme);
