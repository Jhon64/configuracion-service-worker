import { MarcaRepository } from "../repository/marcas.repository"

export class MarcasService{
   private _repository=new MarcaRepository()
   async findAll() {
     return await this._repository.findAll()
   }
   async create(add:any[]) {
     return await this._repository.registerUpdateMultiple(add)
   }
 
   async deleteAll() {
     return await this._repository.deleteAll()
   }
 }