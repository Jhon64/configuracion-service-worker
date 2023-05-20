import { Schema, Types } from "mongoose";
import { MongoDB } from "../../database/mongoDB";
import { BaseScheme, IBaseScheme } from "../base.scheme"

export interface IMenuScheme extends IBaseScheme {
  route?: string;
  class?: string;
  css?: string;
  icono?: string;
  nombre?: string;
  shortNombre?: string;
  modulo?: string;
  orden?: number;
  submenus?:Partial<ISubMenuScheme>[]
}

export const MenuScheme = new Schema<IMenuScheme>({
  ...BaseScheme ,
  route: { type: String, required: true },
  nombre: { type: String, required: true },
  class: { type: String ,default:''},
  css: { type: String ,default:''},
  icono: { type: String,default:'' },
  shortNombre: { type: String,default:'' },
  modulo: { type: String ,default:''},
  orden: { type: Number },
  submenus: { type: Array<ISubMenuScheme> },
},)

export const MenuModel = MongoDB.getInstance._connection.model(
  'Menu',
  MenuScheme
)


export interface ISubMenuScheme extends IBaseScheme {
  route: string;
  class?: string;
  css?: string;
  icono?: string;
  nombre: string;
  shortNombre?: string;
  modulo?: string;
  orden?: number;
  menu?: any;
}
export const SubMenuScheme = new Schema<ISubMenuScheme>({
  ...BaseScheme ,
  route: { type: String, required: true },
  nombre: { type: String, required: true },
  class: { type: String },
  css: { type: String },
  icono: { type: String },
  shortNombre: { type: String },
  modulo: { type: String },
  orden: { type: Number },
  menu: {type: Types.ObjectId, ref: "Menu",required:true}
},)

export const SubMenuModel = MongoDB.getInstance._connection.model(
  'SubMenu',
  SubMenuScheme
)


