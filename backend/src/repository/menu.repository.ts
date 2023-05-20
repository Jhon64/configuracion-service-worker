import { AnyBulkWriteOperation, BulkWriteOptions } from 'mongodb'
import {
  IMenuScheme,
  MenuModel,
  SubMenuModel,
} from './../schemes/security/navegacion.scheme'
import { BaseRepository } from './base.repository'

export class MenuRepository extends BaseRepository<IMenuScheme> {
  private _submenu
  constructor() {
    super(MenuModel)
    this._submenu = SubMenuModel
  }
  override async findAll() {
    return await this._model.find().select('')
  }

  async registerUpdateMultiple(add: Partial<IMenuScheme>[]): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const updatedValues = this.generarUpdateDefaultValues()
      const registrosBulk: AnyBulkWriteOperation<IMenuScheme>[] = []
      console.log('regsitros::', add)
      for (let reg of add) {
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

  async registerMultiple(add: Partial<IMenuScheme>[]): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const registros = []
      console.log('regsitros::', add)
      for (let reg of add) {
        const newAdd = { ...reg, ...defaultValues }
        registros.push(newAdd)
      }

      const register = await this._model.create(registros)
      console.log(register)
      return Array.isArray(register)
        ? register.map((x) => x._id).join(',')
        : register
    } catch (error) {
      throw error
    }
  }
  async findAllDetails() {
    const menu = await this._model.find().select('').where('isDeleted').equals(false)
    for (let _menu of menu) {
      const submenus = await this._submenu
        .find({ menu: _menu._id })
        .select('')
        
      _menu.submenus = submenus
    }
    return menu
  }
}
