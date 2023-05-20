import { SubMenuRepository } from './../repository/submenu.repository';
import { ILoginCredencial } from '../controllers/login.controller';
import { JWT } from '../settings/jwt.token';

export class SubMenuService{
  private _repository=new SubMenuRepository()
  async findAll() {
    return await this._repository.findAll()
  }
  async create(add:any[]) {
    return await this._repository.registerUpdateMultiple(add)
  }

  async deleteAll() {
    return await this._repository.deleteAll()
  }
}