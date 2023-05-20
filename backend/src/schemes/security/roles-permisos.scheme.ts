import { Schema, Types } from 'mongoose'
import { MongoDB } from '../../database/mongoDB'
import { BaseScheme, IBaseScheme } from '../base.scheme'

export interface IRolesScheme extends IBaseScheme {
  nombre?: string
  permisoID?: string
}

export const RolScheme = new Schema<IRolesScheme>({
  ...BaseScheme,
  nombre: { type: String, required: true },
})

export const RolModel = MongoDB.getInstance._connection.model(
  'Rol',
  RolScheme
)

export interface ISubmenusRolesScheme extends IBaseScheme {
  submenuID?: string
  rolID?: string
}
export const SubmenusRolesScheme = new Schema<ISubmenusRolesScheme>({
  ...BaseScheme,
  submenuID: { type: Types.ObjectId, ref: 'SubMenu' },
  rolID: { type: Types.ObjectId, ref: 'Rol' },
})

export const SubmenusRolesModel = MongoDB.getInstance._connection.model(
  'SubMenuRoles',
  SubmenusRolesScheme
)
