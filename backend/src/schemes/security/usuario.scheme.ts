import { MongoDB } from '../../database/mongoDB'
import { model, Schema, Types } from 'mongoose'
import { BaseScheme, IBaseScheme } from '../base.scheme'

export interface IUsuarioScheme extends IBaseScheme {
  username: string
  password: string
  rolID: number
  rolesIDs?: Array<number>
  personaID?: string
  filialIDs?: number[]
  id: string
}

export const UsuarioScheme = new Schema<IUsuarioScheme>({
  ...BaseScheme ,
  username: { type: String, required: true },
  password: { type: String, required: true },
  rolID: { type: Number, required: false },
  rolesIDs: { type: Array<Number> },
  id: Schema.Types.ObjectId,
  filialIDs: { type: Array<Number> },
  personaID: {type: Types.ObjectId, ref: "Persona"}
},)

export const UsuarioModel = MongoDB.getInstance._connection.model(
  'Usuario',
  UsuarioScheme
)
