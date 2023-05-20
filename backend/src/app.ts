import { JWT } from './settings/jwt.token'
import { MongoDB } from './database/mongoDB'
import { ENVIRONMENT } from './constantes'
import express, {
  Application,
  Handler,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express'
import passport from 'passport'
import { controllers } from './controllers/index.controller'
import { MetadataKeys } from './core/metadata-keys'
import { IRouter } from './core/handlers.decorator'
import RedisStore from 'connect-redis'
import morgan from 'morgan'
import session, { SessionOptions } from 'express-session'
import { createClient } from 'redis'
import cors from 'cors'
export class App {
  private readonly _app: Application
  private _sessionConf = {} as SessionOptions
  get instance(): Application {
    return this._app
  }
  constructor(private port?: number) {
    this._app = express()
   
    this.middlewares()
    this.settings()
    this.registerRouters()
  }


  private settings() {
    this._app.use(express.json())
    this._app.set('trust proxy', 1)
    this._app.use(express.urlencoded({ extended: true }))
    this._app.set('port', process.env.PORT || this.port || 5000)
  }
  private middlewares() {
    this._app.use(morgan('dev'))
    this._app.use(passport.initialize())
    this._app.use(cors())
  }
  private registerRouters() {
    this._app.get('/', (req, res) => {
      res.json({ message: 'Hello World!' })
    })
    // TODO: register routers
    const info: Array<{ api: string; handler: string; middleware?: Function }> =
      []
    const exRouter: Router = express.Router()
    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new controllerClass() as any
      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      )
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      )

      const routerMap: Map<string, IRouter> = new Map()
      routers.forEach(({ method, path, jwtMiddleware, handlerName }) => {
        const keyRoute = `${method.toLocaleUpperCase()} ${basePath + path}`
        if (!routerMap.has(keyRoute)) {
          routerMap.set(keyRoute, {
            method,
            path: basePath + path,
            jwtMiddleware: jwtMiddleware ? JWT.verifyToken : JWT.defaultVerify,
            handlerName,
          })
        }
      })

      for (let [keyRoute, { method, path, jwtMiddleware, handlerName }] of [
        ...routerMap,
      ]) {
        exRouter[method](
          path,
          jwtMiddleware,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        )
        info.push({
          api: `${method.toLocaleUpperCase()} ${path}`,
          middleware: jwtMiddleware,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        })
      }
    })

    this._app.use(exRouter)
    console.table(info)
  }
  async listen() {
    await MongoDB.getInstance
      .dbConnection()
      .then((res) => {
        this._app.listen(this._app.get('port'), () => {
          console.log(
            `Server is listening on http://localhost:${this._app.get('port')}`
          )
        })
      })
      .catch((err) => {
        console.log('error al conectar BASE DATOS')
      })
  }
}
