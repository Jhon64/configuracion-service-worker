"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/controller.decorator.ts
const metadata_keys_1 = require("./metadata-keys");
const Controller = (basePath) => {
    return (target) => {
        Reflect.defineMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, basePath, target);
    };
};
exports.default = Controller;
