// src/controllers/cat.controller.ts
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post, Delete } from '../core/handlers.decorator'
import {
  IUsuarioScheme,
  UsuarioModel,
} from '../schemes/security/usuario.scheme'
import { UsuarioService } from '../services/usuario.service'
import { IResponseController } from './index.controller'
export interface ILoginCredencial {
  username: string
  password: string
}

@Controller('/login')
export default class LoginController {
  private _service = new UsuarioService()
  @Post('')
  public async add(req: Request, res: Response): Promise<void> {
    let response = {} as IResponseController
    try {
      const { username, password } = req.body
      const credenciales: ILoginCredencial = { username, password }
      const login = await this._service.login(credenciales)
      response.data = login
      response.status = 200
      response.message = 'usuario validado'
    } catch (error) {
      console.log('error en controller', error)
      response = { error: error + '', data: null, status: 401 }
    }
    res.status(response.status).json(response)
  }
}
