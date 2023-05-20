// src/utils/handlers.decorator.ts
import { MetadataKeys } from './metadata-keys'
import 'reflect-metadata'
import { JWT } from '../settings/jwt.token'
export enum Methods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}
export interface IRouter {
  method: Methods
  path: string
  handlerName: string | symbol
  jwtMiddleware?: any
}
const methodDecoratorFactory = (method: Methods) => {
  // console.log('methodDecoratorFactory::',method)
  return (path: string): MethodDecorator => {
    // console.log('methodDecorator=>path:',path)
    return (target, propertyKey) => {
      // console.log('target, property key', {target,propertyKey})
      // console.log('reflect', Reflect)
      const controllerClass = target.constructor
      const routers: IRouter[] = Reflect.hasMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      )
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
        : []
      routers.push({
        method,
        path,
        handlerName: propertyKey,
      })
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass)
    }
  }
}
export const Get = methodDecoratorFactory(Methods.GET)
export const Post = methodDecoratorFactory(Methods.POST)
export const Delete = methodDecoratorFactory(Methods.DELETE)
export const Put = methodDecoratorFactory(Methods.PUT)
export const ProtectedURL = () => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const controllerClass = target.constructor
    const routers: IRouter[] = Reflect.hasMetadata(
      MetadataKeys.ROUTERS,
      controllerClass
    )
      ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
      : []
    for (let route of routers) {
      route.jwtMiddleware = JWT.verifyToken
    }
    Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass)
  }
}
