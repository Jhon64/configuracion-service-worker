"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const constantes_1 = require("./../constantes");
const mongoose_1 = __importDefault(require("mongoose"));
console.log(constantes_1.ENVIRONMENT.database.mongo.port);
class MongoDB {
    constructor() {
        this._mongoose = mongoose_1.default;
        console.log(constantes_1.ENVIRONMENT);
        this._mongoose.connect(`mongodb://${constantes_1.ENVIRONMENT.database.mongo.host}:${constantes_1.ENVIRONMENT.database.mongo.port || 27017}/${constantes_1.ENVIRONMENT.database.mongo.database}`);
        this._connection = mongoose_1.default.connection;
        try {
            this._connection
                .on('open', console.info.bind(console, 'Database connection: open'))
                .on('close', console.info.bind(console, 'Database connection: close'))
                .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
                .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
                .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
                .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
                .on('all', console.info.bind(console, 'Database connection: all'))
                .on('error', console.error.bind(console, 'MongoDB connection: error:'));
        }
        catch (error) {
            console.error(error);
        }
    }
    inicializarConexion() {
        console.error('inicializando ');
        return new Promise((resolve, reject) => {
            try {
                this._mongoose.connect(`mongodb://${constantes_1.ENVIRONMENT.database.mongo.host}:${constantes_1.ENVIRONMENT.database.port}/${constantes_1.ENVIRONMENT.database}`);
                this._connection = this._mongoose.connection;
                this._connection
                    .on('open', () => {
                    console.log('base de datos conectada');
                    resolve(this._connection);
                })
                    .on('error', (strem) => {
                    console.log('base de datos desconectada');
                    reject(strem);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static get getInstance() {
        if (!MongoDB.Instance) {
            MongoDB.Instance = new MongoDB();
        }
        return MongoDB.Instance;
    }
    dbConnection() {
        return new Promise((resolve, reject) => {
            try {
                this._connection
                    .on('open', () => {
                    console.log('base de datos conectada');
                    resolve(this._connection);
                })
                    .on('disconnected', async () => {
                    console.log('base de datos desconectada --- volviendo a conectar');
                    const result = await this.inicializarConexion();
                    reject(result);
                });
            }
            catch (e) {
                console.log('error al conectar', e);
                reject(e);
            }
        });
    }
}
exports.MongoDB = MongoDB;
