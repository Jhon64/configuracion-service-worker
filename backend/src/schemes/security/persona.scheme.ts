import { Schema } from "mongoose"
import { MongoDB } from "../../database/mongoDB"
import { BaseScheme, IBaseScheme } from "../base.scheme"

export interface IPersonaScheme extends IBaseScheme {
  nombres?:string
  paterno?:string
  materno?:string
  dni?:string
  sexo?:string
  fechaNacimiento?:number
}

export const PersonaScheme = new Schema<IPersonaScheme>({
  ...BaseScheme ,
  nombres: { type: String, required: true },
  paterno: { type: String, required: true },
  materno: { type: String, required: true },
  dni: { type: String},
  sexo: { type: String},
  fechaNacimiento: { type: Number},
},)

export const PersonaModel = MongoDB.getInstance._connection.model(
  'Persona',
  PersonaScheme
)