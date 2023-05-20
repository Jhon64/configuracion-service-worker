
import { Schema } from "mongoose"
import { MongoDB } from "../../database/mongoDB"
import { IBaseScheme, BaseScheme } from "../base.scheme"


export interface ICategoriaScheme extends IBaseScheme {
   nombre?:string
   descripcion?:string
 }
 
 export const CategoriaScheme = new Schema<ICategoriaScheme>({
   ...BaseScheme ,
   nombre: { type: String, required: true },
   descripcion: { type: String, required: false }
 },)
 
 export const CategoriaModel = MongoDB.getInstance._connection.model(
   'Categoria',
   CategoriaScheme
 )