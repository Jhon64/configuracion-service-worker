
import { Schema } from "mongoose"
import { MongoDB } from "../../database/mongoDB"
import { IBaseScheme, BaseScheme } from "../base.scheme"


export interface IMarcaScheme extends IBaseScheme {
   nombre?:string
   descripcion?:string
 }
 
 export const MarcaScheme = new Schema<IMarcaScheme>({
   ...BaseScheme ,
   nombre: { type: String, required: true },
   descripcion: { type: String, required: false }
 },)
 
 export const MarcaModel = MongoDB.getInstance._connection.model(
   'Marcas',
   MarcaScheme
 )