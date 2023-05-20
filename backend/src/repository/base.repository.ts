import { IUsuarioScheme, UsuarioScheme } from './../schemes/security/usuario.scheme';
import { Model, model, ObjectId } from "mongoose"
import { getFechaUnix } from "../helpers/fechas"
import { IBaseScheme } from "../schemes/base.scheme"
import { IBaseRepository } from "./base.repository.interface"
import { AnyBulkWriteOperation, BulkWriteOptions } from 'mongodb'
export class BaseRepository<T> implements IBaseRepository<T>{
  protected _model
  constructor(model:  Model<T>) { this._model = model }
  
  protected generarDefaultValues(usuarioID?:number) {
    const values: IBaseScheme = {
      createdAt:getFechaUnix(),
      updatedAt:getFechaUnix(),
      isDeleted: false,
      status: true,
      createUserID: usuarioID||1,
      updateUserID:usuarioID||1
    } 
    return values
  }
  protected generarUpdateDefaultValues(usuarioID?:number,status?:boolean,deleted?:boolean) {
    const values: Partial<IBaseScheme> = {
      updatedAt:getFechaUnix(),
      isDeleted:  deleted?deleted:false,
      status: status?status:true,
      updateUserID:usuarioID?usuarioID:1
    } 
    return values
  }

  async findAll(): Promise<Partial<T>[]> {
    try {
      const findAll = await this._model.find({ isDeleted:false })
      return findAll
    } catch (error) {
      throw error
    }
   
  }
  async findByID(_id: string): Promise<T | null> {
     try {
      const find = await this._model.findById(_id)
      return find
    } catch (error) {
      throw error
    }
  }



  async register(add: Partial<T>): Promise<any> {
    try {
      const defaultValues=this.generarDefaultValues()
      const newAdd = { ...add, ...defaultValues }
      const register = await this._model.create(newAdd)
      return register._id
    } catch (error) {
      throw error
    }
  }
  async delete(_id: string): Promise<boolean> {
    try {
      const register = await this._model.updateOne({},{_id,isDeleted:true,status:false})
      return register.modifiedCount>0?true:false
    } catch (error) {
      throw error
    }
  }
  async deleteAll(): Promise<boolean> {
    try {
      const register: any = await this._model.updateMany({},{isDeleted:true,status:false})
      console.log('eliminados::',register)
      return register.modifiedCount>0?true:false
    } catch (error) {
      throw error
    }
  }
}