"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = require("./app");
require("reflect-metadata");
const constantes_1 = require("./constantes");
function main() {
    const port = constantes_1.ENVIRONMENT.server.port || 5000;
    const app = new app_1.App(port);
    app.listen();
}
main();
