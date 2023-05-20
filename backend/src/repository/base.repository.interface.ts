export interface IBaseRepository <T>{
  findAll(): Promise<Array<Partial<T>>>
  findByID(_id: string): Promise<T | null>
  register(add: Partial<T>): Promise<string>
  delete(_id:string):Promise<boolean>
}
