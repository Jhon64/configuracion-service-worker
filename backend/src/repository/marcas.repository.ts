
import { AnyBulkWriteOperation, BulkWriteOptions } from 'mongodb'
import { IMarcaScheme, MarcaModel } from '../schemes/maestros/marcas.scheme'
import { BaseRepository } from './base.repository'

export class MarcaRepository extends BaseRepository<IMarcaScheme> {
  private _submenu
  constructor() {
    super(MarcaModel)
    this._submenu = MarcaModel
  }
  override async findAll() {
    return await this._model.find().select('')
  }

  async registerUpdateMultiple(add: Partial<IMarcaScheme>[]): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const updatedValues = this.generarUpdateDefaultValues()
      const registrosBulk: AnyBulkWriteOperation<IMarcaScheme>[] = []
      console.log('registros::', add)
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

  async registerMultiple(add: Partial<IMarcaScheme>[]): Promise<any> {
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
 
}
