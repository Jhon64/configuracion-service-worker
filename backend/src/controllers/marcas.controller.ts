import { MarcasService } from './../services/marcas.service';
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post, Delete, ProtectedURL } from '../core/handlers.decorator'
import { IResponseController } from './index.controller';
import { IMarcaScheme } from '../schemes/maestros/marcas.scheme';
@Controller('/marcas')
export default class MarcasController {
  private _service = new MarcasService()

  @ProtectedURL()
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
    let _response = { status:200,data:null,message:'registrando marcas'} as IResponseController
    try {
      const body = req.body
      const regs: Partial<IMarcaScheme>[]= [ ...body ]
      console.log('submenu request::', regs)
      for (let _add of regs) {
        if (!_add.nombre ) {
          return  res.status(400).json({message:'[nombre] son requeridos'})
          }
      }
      
      const save = await this._service.create(regs)
      console.log(save)
      _response.data=save
    } catch (error) {
      _response = { error: error + '', data: null, status: 500 }
    }
    return res.status(_response.status).json(_response)
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
