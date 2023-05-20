// src/controllers/cat.controller.ts
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post,Delete, ProtectedURL } from '../core/handlers.decorator'
import { IUsuarioScheme, UsuarioModel } from '../schemes/security/usuario.scheme'
import { UsuarioService } from '../services/usuario.service'
import { IResponseController } from './index.controller'
@Controller('/usuario')
export default class UsuarioController {
  private _service = new UsuarioService()
  @ProtectedURL()
  @Get('')
  public async listarTodo(req: Request, res: Response): Promise<void> {
    let response = { status:200,data:[],message:'Listando datos'} as IResponseController
    try {
      const findAll = await this._service.findAll()
      response.data=findAll
    } catch (error) {
      response = { error: error + '', data: null, status: 500 }
    }
    res.status(response.status).json(response)
    
  }

  @ProtectedURL()
  @Get('/all')
  public async listarTodo2(req: Request, res: Response): Promise<void> {
    let response = { status:200,data:[],message:'Listando datos'} as IResponseController
    try {
      const findAll = await this._service.findAll()
      response.data=findAll
    } catch (error) {
      response = { error: error + '', data: null, status: 500 }
    }
    res.status(response.status).json(response)
  }

  @Post('')
  public async add(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body
      const newUsuario: IUsuarioScheme[]= [ ...body ]
      const save = await this._service.create(newUsuario)
      console.log(save)
      res.status(200).json(save)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:error+''})
    }
  }

  @Delete('/all')
  public async deleteAll(req: Request, res: Response): Promise<any> {
    try {
      const dele = await this._service.deleteAll()
      console.log(dele)
      res.status(200).json(dele)
    } catch (error) {
      res.status(500).send(error)
    }
  }
 
}
