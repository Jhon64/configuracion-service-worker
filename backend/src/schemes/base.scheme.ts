import { Schema } from 'mongoose'

export interface IBaseScheme {
  createUserID?: number
  updateUserID?: number
  status: boolean
  isDeleted: boolean
  createdAt: number
  updatedAt: number
  _id?: string
}

export const BaseScheme = {
  
  createUserID: { type: Number },
  updateUserID: { type: Number },
  status: { type: Boolean, required: true, default: true },
  isDeleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Number, default: Math.floor(Date.now() / 1000) },
  updatedAt: { type: Number, default: Math.floor(Date.now() / 1000) },
}
