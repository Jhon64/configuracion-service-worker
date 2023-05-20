import { MenuService } from './../services/menu.service'
// src/controllers/cat.controller.ts
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post, Delete, ProtectedURL } from '../core/handlers.decorator'
import { IMenuScheme } from '../schemes/security/navegacion.scheme'
import { IResponseController } from './index.controller'
@Controller('/menu')
export default class MenuController {
  private _service = new MenuService()

  @Get('/all')
  public async findAll(req: Request, res: Response): Promise<void> {
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
  @Post('')
  public async add(req: Request, res: Response): Promise<any> {
    let _response = { status:200,data:[],message:'Listando datos'} as IResponseController
    try {
      const body = req.body
      const add: Partial<IMenuScheme>[] = [...body]
      const save = await this._service.create(add)
      _response.data=save
    } catch (error) {
      console.log('create menu::', error)
     _response = { error: error + '', data: null, status: 500 }
     
    }
    res.status(_response.status).json(_response)
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
