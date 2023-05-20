"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSPORT = void 0;
const usuario_repository_1 = require("./../repository/usuario.repository");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
exports.PASSPORT = {
    authStrategy: (username, password, done) => {
        const usuario = new usuario_repository_1.UsuarioRepository().login({ username, password });
        if (!usuario)
            return done(null, false, { message: 'usuario no encotrado' });
        return done(null, usuario);
    },
    auth: (authUser) => {
        return passport_1.default.use('passportLogin', new passport_local_1.default.Strategy({ usernameField: 'username', passwordField: 'password' }, exports.PASSPORT.authStrategy));
    },
    serializarUsuario: () => {
        passport_1.default.serializeUser((user, done) => {
            return done(null, user === null || user === void 0 ? void 0 : user._id);
        });
    },
    deserializarUsuario: (id) => {
        passport_1.default.serializeUser((id, done) => {
            done(null, id);
        });
    }
};
