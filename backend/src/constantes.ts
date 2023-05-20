import * as yaml from 'node-yaml-config';
import path from 'path'
import fs from 'fs'
import jsYaml, { DEFAULT_SCHEMA, JSON_SCHEMA } from 'js-yaml'
const basePath = path.resolve('./')
const routePath=basePath + '/environment.yml'
export const ENVIRONMENT: any = jsYaml.load(fs.readFileSync(routePath,'utf8'),{schema:DEFAULT_SCHEMA})
// export const ENVIRONMENT: any = yaml.loadAsync(routePath)