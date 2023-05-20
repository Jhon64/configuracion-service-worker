import { ILoginCredencial } from '../controllers/login.controller';
import { JWT } from '../settings/jwt.token';
import { PASSPORT } from '../settings/passort';
import { UsuarioRepository } from './../repository/usuario.repository';

export class UsuarioService{
  private _repository=new UsuarioRepository()
  async findAll() {
    return await this._repository.findAll()
  }
  async create(add:any[]) {
    return await this._repository.registerUpdateMultiple(add)
  }

  async deleteAll() {
    return await this._repository.deleteAll()
  }

  async login(credenciales: ILoginCredencial) {
    try {
      const {_id,username,filialIDs,rolID,personaID,rolesIDs,createdAt,updatedAt} = await this._repository.login(credenciales)
      const setUser:any = { token:null,_id, username, filialIDs, rolID, personaID, rolesIDs, createdAt, updatedAt } 
      const generateToken = JWT.generate(setUser)
      // PASSPORT.auth(setUser)//* validacion con passport
      setUser.token=generateToken
      return setUser
    } catch (error) {
      throw error
    }
    
  }
}