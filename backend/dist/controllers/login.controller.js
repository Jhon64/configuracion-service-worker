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
let LoginController = class LoginController {
    constructor() {
        this._service = new usuario_service_1.UsuarioService();
    }
    async add(req, res) {
        let response = {};
        try {
            const { username, password } = req.body;
            const credenciales = { username, password };
            const login = await this._service.login(credenciales);
            response.data = login;
            response.status = 200;
            response.message = 'usuario validado';
        }
        catch (error) {
            console.log('error en controller', error);
            response = { error: error + '', data: null, status: 401 };
        }
        res.status(response.status).json(response);
    }
};
__decorate([
    (0, handlers_decorator_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "add", null);
LoginController = __decorate([
    (0, controller_decorator_1.default)('/login')
], LoginController);
exports.default = LoginController;
