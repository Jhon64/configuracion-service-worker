"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_decorator_1 = __importDefault(require("../core/controller.decorator"));
const handlers_decorator_1 = require("../core/handlers.decorator");
const usuario_service_1 = require("../services/usuario.service");
let UsuarioController = class UsuarioController {
    constructor() {
        this._service = new usuario_service_1.UsuarioService();
    }
    async listarTodo(req, res) {
        let response = { status: 200, data: [], message: 'Listando datos' };
        try {
            const findAll = await this._service.findAll();
            response.data = findAll;
        }
        catch (error) {
            response = { error: error + '', data: null, status: 500 };
        }
        res.status(response.status).json(response);
    }
    async listarTodo2(req, res) {
        let response = { status: 200, data: [], message: 'Listando datos' };
        try {
            const findAll = await this._service.findAll();
            response.data = findAll;
        }
        catch (error) {
            response = { error: error + '', data: null, status: 500 };
        }
        res.status(response.status).json(response);
    }
    async add(req, res) {
        try {
            const body = req.body;
            const newUsuario = [...body];
            const save = await this._service.create(newUsuario);
            console.log(save);
            res.status(200).json(save);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error + '' });
        }
    }
    async deleteAll(req, res) {
        try {
            const dele = await this._service.deleteAll();
            console.log(dele);
            res.status(200).json(dele);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
};
__decorate([
    (0, handlers_decorator_1.ProtectedURL)(),
    (0, handlers_decorator_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarTodo", null);
__decorate([
    (0, handlers_decorator_1.ProtectedURL)(),
    (0, handlers_decorator_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarTodo2", null);
__decorate([
    (0, handlers_decorator_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "add", null);
__decorate([
    (0, handlers_decorator_1.Delete)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deleteAll", null);
UsuarioController = __decorate([
    (0, controller_decorator_1.default)('/usuario')
], UsuarioController);
exports.default = UsuarioController;
