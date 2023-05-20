"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaModel = exports.PersonaScheme = void 0;
const mongoose_1 = require("mongoose");
const mongoDB_1 = require("../../database/mongoDB");
const base_scheme_1 = require("../base.scheme");
exports.PersonaScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    nombres: { type: String, required: true },
    paterno: { type: String, required: true },
    materno: { type: String, required: true },
    dni: { type: String },
    sexo: { type: String },
    fechaNacimiento: { type: Number },
});
exports.PersonaModel = mongoDB_1.MongoDB.getInstance._connection.model('Persona', exports.PersonaScheme);
