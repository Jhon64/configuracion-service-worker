// src/server.ts
import {App} from './app';
import * as http from 'http';
import 'reflect-metadata';
import { ENVIRONMENT } from './constantes';

function main() {
  const port=ENVIRONMENT.server.port||5000
  const app = new App(port)
  app.listen()
}
main()