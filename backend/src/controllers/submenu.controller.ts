import { ISubMenuScheme } from './../schemes/security/navegacion.scheme';
import { Request, Response } from 'express'
import Controller from '../core/controller.decorator'
import { Get, Post, Delete, ProtectedURL } from '../core/handlers.decorator'
import { SubMenuService } from '../services/submenu.service';
import { IResponseController } from './index.controller';
import { SubmenuAddDTO } from '../dto/request/submenu.dto';
@Controller('/submenu')
export default class SubMenuController {
  private _service = new SubMenuService()

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
    let _response = { status:200,data:null,message:'registrando submenu'} as IResponseController
    try {
      const body = req.body
      const regs: SubmenuAddDTO []= [ ...body ]
      console.log('submenu request::', regs)
      for (let _add of regs) {
        if (!_add.nombre || !_add.route || !_add.menuID) {
          return  res.status(400).json({message:'[nombre,route,menuID] son requeridos'})
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
