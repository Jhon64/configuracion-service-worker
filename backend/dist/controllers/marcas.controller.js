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
const marcas_service_1 = require("./../services/marcas.service");
const controller_decorator_1 = __importDefault(require("../core/controller.decorator"));
const handlers_decorator_1 = require("../core/handlers.decorator");
let MarcasController = class MarcasController {
    constructor() {
        this._service = new marcas_service_1.MarcasService();
    }
    async findAll(req, res) {
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
        let _response = { status: 200, data: null, message: 'registrando marcas' };
        try {
            const body = req.body;
            const regs = [...body];
            console.log('submenu request::', regs);
            for (let _add of regs) {
                if (!_add.nombre) {
                    return res.status(400).json({ message: '[nombre] son requeridos' });
                }
            }
            const save = await this._service.create(regs);
            console.log(save);
            _response.data = save;
        }
        catch (error) {
            _response = { error: error + '', data: null, status: 500 };
        }
        return res.status(_response.status).json(_response);
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
    (0, handlers_decorator_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarcasController.prototype, "findAll", null);
__decorate([
    (0, handlers_decorator_1.ProtectedURL)(),
    (0, handlers_decorator_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarcasController.prototype, "add", null);
__decorate([
    (0, handlers_decorator_1.Delete)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarcasController.prototype, "deleteAll", null);
MarcasController = __decorate([
    (0, controller_decorator_1.default)('/marcas')
], MarcasController);
exports.default = MarcasController;
