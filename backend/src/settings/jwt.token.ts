import { ENVIRONMENT } from './../constantes'
import jsonWebToken, { SignOptions } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
export const JWT = {
  generate(user: any) {
    const secret = ENVIRONMENT.jwt.secretKey || 'miSecret'
    const options: SignOptions = {
      // expiresIn: ENVIRONMENT.jwt.expiresIn,
      // algorithm: ENVIRONMENT.jwt.algorithm,
    }
    try {
      return jsonWebToken.sign(user, secret, options)
    } catch (error) {
      console.log('error generando token', error)
      throw new Error(error + '')
    }
  },
  decode(token: string) {
    const secret = ENVIRONMENT.jwt.secretKey || 'miSecret'
    const options: SignOptions = {
      expiresIn: ENVIRONMENT.jwt.expiresIn,
      algorithm: ENVIRONMENT.jwt.algorithm,
    }
    let verifyToken
    try {
      jsonWebToken.verify(token, secret, (err: any, decode: any) => {
        if (err) {
          throw err
        }
        verifyToken = decode
      })
    } catch (error) {
      throw error
    }
    return verifyToken
  },
  verifyToken(req: Request, res: Response, next: NextFunction) {
    // middleware to validate token (rutas protegidas)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log('token recibido ::',token)
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
      const verified = JWT.decode(token)
      req.user = verified
      next() // continuamos
    } catch (error) {
      console.log('ERROR AUTH JWT',error)
       res.status(401).json({ error: 'token no es válido' })
    }
  },
  defaultVerify(req: Request, res: Response, next: NextFunction) { return next() }
}
