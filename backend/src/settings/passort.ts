import { UsuarioRepository } from './../repository/usuario.repository';
import { IUsuarioScheme } from '../schemes/security/usuario.scheme'
import passport from 'passport'
import passportLocal from 'passport-local'

export const PASSPORT = {
  authStrategy: (username: string, password: string, done:any) => {
    const usuario = new UsuarioRepository().login({ username, password })
    if(!usuario)return done(null,false,{message:'usuario no encotrado'})
    return done(null, usuario)
  },
  auth: (authUser: any) => {
    return passport.use('passportLogin',
      new passportLocal.Strategy(
        { usernameField: 'username', passwordField: 'password' },
        PASSPORT.authStrategy
      )
    )
  },
  serializarUsuario: () => {
    passport.serializeUser((user:any, done) => {
      return done(null,user?._id)
    })
  },
  deserializarUsuario: (id:any) => {
    passport.serializeUser((id, done) => {
      done(null,id)
    })
  }
}
