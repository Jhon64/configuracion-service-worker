import { CategoriaRepository } from './../repository/categoria.repository';


export class CategoriaService{
   private _repository=new CategoriaRepository()
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