import { ICategoriaScheme, CategoriaModel } from './../schemes/maestros/categorias.scheme';

import { AnyBulkWriteOperation, BulkWriteOptions } from 'mongodb'

import { BaseRepository } from './base.repository'

export class CategoriaRepository extends BaseRepository<ICategoriaScheme> {
  constructor() {
    super(CategoriaModel)
    
  }
  override async findAll() {
    return await this._model.find().select('')
  }

  async registerUpdateMultiple(add: Partial<ICategoriaScheme>[]): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const updatedValues = this.generarUpdateDefaultValues()
      const registrosBulk: AnyBulkWriteOperation<ICategoriaScheme>[] = []
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


}
