"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jwt_token_1 = require("./settings/jwt.token");
const mongoDB_1 = require("./database/mongoDB");
const constantes_1 = require("./constantes");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const index_controller_1 = require("./controllers/index.controller");
const metadata_keys_1 = require("./core/metadata-keys");
const connect_redis_1 = __importDefault(require("connect-redis"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const cors_1 = __importDefault(require("cors"));
class App {
    get instance() {
        return this._app;
    }
    constructor(port) {
        this.port = port;
        this._sessionConf = {};
        this._app = (0, express_1.default)();
        this.redis();
        this.middlewares();
        this.settings();
        this.registerRouters();
    }
    redis() {
        const sess = {
            secret: constantes_1.ENVIRONMENT.auth.session.secret || 'secret',
            resave: constantes_1.ENVIRONMENT.auth.session.resave || false,
            saveUninitialized: constantes_1.ENVIRONMENT.auth.session.saveUninitialized || false,
            cookie: { secure: constantes_1.ENVIRONMENT.auth.session.cookie.secure || true },
        };
        const modeDev = constantes_1.ENVIRONMENT.mode;
        if (modeDev == 'prod') {
            this._app.set('trust proxy', 1); // trust first proxy
            sess.cookie.secure = true; // serve secure cookies
        }
        this._sessionConf = sess;
        let redisClient = (0, redis_1.createClient)();
        redisClient.connect().catch(console.error);
        let redisStore = new connect_redis_1.default({
            client: redisClient,
            prefix: 'tienda_online:',
        });
        // Initialize sesssion storage.
        this._app.use((0, express_session_1.default)({ store: redisStore, ...this._sessionConf }));
    }
    settings() {
        this._app.use(express_1.default.json());
        this._app.set('trust proxy', 1);
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.set('port', process.env.PORT || this.port || 5000);
    }
    middlewares() {
        this._app.use((0, morgan_1.default)('dev'));
        this._app.use(passport_1.default.initialize());
        this._app.use(passport_1.default.session());
        this._app.use((0, cors_1.default)());
    }
    registerRouters() {
        this._app.get('/', (req, res) => {
            res.json({ message: 'Hello World!' });
        });
        // TODO: register routers
        const info = [];
        const exRouter = express_1.default.Router();
        index_controller_1.controllers.forEach((controllerClass) => {
            const controllerInstance = new controllerClass();
            const basePath = Reflect.getMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, controllerClass);
            const routers = Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass);
            const routerMap = new Map();
            routers.forEach(({ method, path, jwtMiddleware, handlerName }) => {
                const keyRoute = `${method.toLocaleUpperCase()} ${basePath + path}`;
                if (!routerMap.has(keyRoute)) {
                    routerMap.set(keyRoute, {
                        method,
                        path: basePath + path,
                        jwtMiddleware: jwtMiddleware ? jwt_token_1.JWT.verifyToken : jwt_token_1.JWT.defaultVerify,
                        handlerName,
                    });
                }
            });
            for (let [keyRoute, { method, path, jwtMiddleware, handlerName }] of [
                ...routerMap,
            ]) {
                exRouter[method](path, jwtMiddleware, controllerInstance[String(handlerName)].bind(controllerInstance));
                info.push({
                    api: `${method.toLocaleUpperCase()} ${path}`,
                    middleware: jwtMiddleware,
                    handler: `${controllerClass.name}.${String(handlerName)}`,
                });
            }
        });
        this._app.use(exRouter);
        console.table(info);
    }
    async listen() {
        await mongoDB_1.MongoDB.getInstance
            .dbConnection()
            .then((res) => {
            this._app.listen(this._app.get('port'), () => {
                console.log(`Server is listening on http://localhost:${this._app.get('port')}`);
            });
        })
            .catch((err) => {
            console.log('error al conectar BASE DATOS');
        });
    }
}
exports.App = App;
