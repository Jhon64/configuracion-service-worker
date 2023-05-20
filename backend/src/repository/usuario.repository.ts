import { UsuarioScheme } from '../schemes/security/usuario.scheme'
import { AnyBulkWriteOperation, BulkWriteOptions } from 'mongodb'
import { IUsuarioScheme, UsuarioModel } from '../schemes/security/usuario.scheme'
import { BaseRepository } from './base.repository'
import { IBaseRepository } from './base.repository.interface'
import { Model } from 'mongoose'
import { ILoginCredencial } from '../controllers/login.controller'

export class UsuarioRepository extends BaseRepository<IUsuarioScheme> {
  constructor() {
    super(UsuarioModel)
  }
  async login(credenciales: ILoginCredencial): Promise<IUsuarioScheme> {
    try {
      const find = await this._model.findOne({
        username: credenciales.username,
        password: credenciales.password,
        isDeleted:false
      })
      if (!find) throw `credenciales invalidas [${JSON.stringify(credenciales)}]`
      return find
    } catch (error) {
      throw error
    }
  }


  async registerUpdateMultiple(add: Partial<IUsuarioScheme>[]): Promise<any> {
    try {
      const defaultValues = this.generarDefaultValues()
      const updatedValues = this.generarUpdateDefaultValues()
      const registrosBulk: AnyBulkWriteOperation<IUsuarioScheme>[] = []
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


}
