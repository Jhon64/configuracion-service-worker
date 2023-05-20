"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const jwt_token_1 = require("../settings/jwt.token");
const usuario_repository_1 = require("./../repository/usuario.repository");
class UsuarioService {
    constructor() {
        this._repository = new usuario_repository_1.UsuarioRepository();
    }
    async findAll() {
        return await this._repository.findAll();
    }
    async create(add) {
        return await this._repository.registerUpdateMultiple(add);
    }
    async deleteAll() {
        return await this._repository.deleteAll();
    }
    async login(credenciales) {
        try {
            const { _id, username, filialIDs, rolID, personaID, rolesIDs, createdAt, updatedAt } = await this._repository.login(credenciales);
            const setUser = { token: null, _id, username, filialIDs, rolID, personaID, rolesIDs, createdAt, updatedAt };
            const generateToken = jwt_token_1.JWT.generate(setUser);
            // PASSPORT.auth(setUser)//* validacion con passport
            setUser.token = generateToken;
            return setUser;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UsuarioService = UsuarioService;
