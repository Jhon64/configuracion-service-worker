import { IMenuScheme } from './../schemes/security/navegacion.scheme'
import { ILoginCredencial } from '../controllers/login.controller'
import { MenuRepository } from '../repository/menu.repository'
import { JWT } from '../settings/jwt.token'
import { PASSPORT } from '../settings/passort'
import { UsuarioRepository } from './../repository/usuario.repository'

export class MenuService {
  private _repository = new MenuRepository()
  async findAll() {
    return await this._repository.findAllDetails()
  }
  async create(add: Partial<IMenuScheme>[]) {
    return await this._repository.registerUpdateMultiple(add)
  }

  async deleteAll() {
    return await this._repository.deleteAll()
  }
}
