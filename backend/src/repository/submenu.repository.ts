import { SubmenuAddDTO } from './../dto/request/submenu.dto';
import { MenuModel } from './../schemes/security/navegacion.scheme'
import { AnyBulkWriteOperation, BulkWriteOptions } from 'mongodb'
import {
  ISubMenuScheme,
  SubMenuModel,
} from '../schemes/security/navegacion.scheme'
import { BaseRepository } from './base.repository'

export class SubMenuRepository extends BaseRepository<ISubMenuScheme> {
  private _menuModel
  constructor() {
    super(SubMenuModel)
    this._menuModel = MenuModel
  }
  override async findAll() {
    return await this._model
      .find()
      .select('')
      .populate({
        path: 'menu',
        select: 'nombre _id',
      })
  }


  async registerUpdateMultiple(add: SubmenuAddDTO[]): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const updatedValues = this.generarUpdateDefaultValues()
      const registrosBulk: AnyBulkWriteOperation<ISubMenuScheme>[] = []
      console.log('regsitros::', add)
      for (let reg of add) {
        reg.menu=await this._menuModel.findById(reg.menuID)
        let itemReg = {} as any
        if (reg._id) {
          itemReg = {
            updateOne: {
              update: { ...reg},
              filter: { _id: reg._id },
            },
          }
        } else {
          itemReg = { insertOne: { document: { ...reg, ...defaultValues } } }
        }
        console.log('registros bulk',itemReg)
        registrosBulk.push(itemReg)
      }

      const register = await this._model.bulkWrite(registrosBulk)
      console.log(register)
      return Array.isArray(register)
        ? register.map((x) => x._id).join(',')
        : register
    } catch (error) {
      throw error
    }
  }


  override async register(add: Partial<ISubMenuScheme>): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const newAdd: Partial<ISubMenuScheme> = { ...add, ...defaultValues }
      const menuFind = await this._menuModel.findById(add.menu)
      if (!menuFind) throw 'Menu no disponible'
      newAdd.menu = menuFind
      const register = await this._model.create(newAdd)
      return register._id
    } catch (error) {
      throw error
    }
  }
}
