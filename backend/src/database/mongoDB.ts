import { ENVIRONMENT } from './../constantes'
import mongoose, { Mongoose, Connection } from 'mongoose'
console.log(ENVIRONMENT.database.mongo.port)
export class MongoDB {
   _connection: Connection
  private _mongoose = mongoose
  private static Instance: MongoDB
  constructor() {
    console.log(ENVIRONMENT)
    this._mongoose.connect(
      `mongodb://${ENVIRONMENT.database.mongo.host}:${ENVIRONMENT.database.mongo.port||27017}/${ENVIRONMENT.database.mongo.database}`
    )
    this._connection = mongoose.connection
    try {
      this._connection
        .on('open', console.info.bind(console, 'Database connection: open'))
        .on('close', console.info.bind(console, 'Database connection: close'))
        .on(
          'disconnected',
          console.info.bind(console, 'Database connection: disconnecting')
        )
        .on(
          'disconnected',
          console.info.bind(console, 'Database connection: disconnected')
        )
        .on(
          'reconnected',
          console.info.bind(console, 'Database connection: reconnected')
        )
        .on(
          'fullsetup',
          console.info.bind(console, 'Database connection: fullsetup')
        )
        .on('all', console.info.bind(console, 'Database connection: all'))
        .on('error', console.error.bind(console, 'MongoDB connection: error:'))
    } catch (error) {
      console.error(error)
    }
  }

  private inicializarConexion() {
    console.error('inicializando ')
    return new Promise<any>((resolve, reject) => {
      try {
        this._mongoose.connect(
          `mongodb://${ENVIRONMENT.database.mongo.host}:${ENVIRONMENT.database.port}/${ENVIRONMENT.database}`
        )
        this._connection = this._mongoose.connection
        this._connection
          .on('open', () => {
            console.log('base de datos conectada')
            resolve(this._connection)
          })
          .on('error', (strem) => {
            console.log('base de datos desconectada')
            reject(strem)
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  public static get getInstance(): MongoDB {
    if (!MongoDB.Instance) {
      MongoDB.Instance = new MongoDB()
    }
    return MongoDB.Instance
  }

  dbConnection() {
    return new Promise<any>((resolve, reject) => {
      try {
        this._connection
          .on('open', () => {
            console.log('base de datos conectada')
            resolve(this._connection)
          })
          .on('disconnected', async () => {
            console.log('base de datos desconectada --- volviendo a conectar')
            const result = await this.inicializarConexion()
            reject(result)
          })
      } catch (e) {
        console.log('error al conectar', e)
        reject(e)
      }
    })
  }
}
