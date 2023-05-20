"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const categoria_controller_1 = __importDefault(require("./categoria.controller"));
const login_controller_1 = __importDefault(require("./login.controller"));
const marcas_controller_1 = __importDefault(require("./marcas.controller"));
const menu_controller_1 = __importDefault(require("./menu.controller"));
const submenu_controller_1 = __importDefault(require("./submenu.controller"));
const usuario_controller_1 = __importDefault(require("./usuario.controller"));
exports.controllers = [
    usuario_controller_1.default,
    login_controller_1.default,
    menu_controller_1.default,
    submenu_controller_1.default,
    categoria_controller_1.default,
    marcas_controller_1.default
];
