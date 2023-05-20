"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = exports.UsuarioScheme = void 0;
const mongoDB_1 = require("../../database/mongoDB");
const mongoose_1 = require("mongoose");
const base_scheme_1 = require("../base.scheme");
exports.UsuarioScheme = new mongoose_1.Schema({
    ...base_scheme_1.BaseScheme,
    username: { type: String, required: true },
    password: { type: String, required: true },
    rolID: { type: Number, required: false },
    rolesIDs: { type: (Array) },
    id: mongoose_1.Schema.Types.ObjectId,
    filialIDs: { type: (Array) },
    personaID: { type: mongoose_1.Types.ObjectId, ref: "Persona" }
});
exports.UsuarioModel = mongoDB_1.MongoDB.getInstance._connection.model('Usuario', exports.UsuarioScheme);
