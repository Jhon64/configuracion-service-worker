"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedURL = exports.Put = exports.Delete = exports.Post = exports.Get = exports.Methods = void 0;
// src/utils/handlers.decorator.ts
const metadata_keys_1 = require("./metadata-keys");
require("reflect-metadata");
const jwt_token_1 = require("../settings/jwt.token");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["DELETE"] = "delete";
    Methods["PUT"] = "put";
})(Methods = exports.Methods || (exports.Methods = {}));
const methodDecoratorFactory = (method) => {
    // console.log('methodDecoratorFactory::',method)
    return (path) => {
        // console.log('methodDecorator=>path:',path)
        return (target, propertyKey) => {
            // console.log('target, property key', {target,propertyKey})
            // console.log('reflect', Reflect)
            const controllerClass = target.constructor;
            const routers = Reflect.hasMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass)
                : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(metadata_keys_1.MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };
};
exports.Get = methodDecoratorFactory(Methods.GET);
exports.Post = methodDecoratorFactory(Methods.POST);
exports.Delete = methodDecoratorFactory(Methods.DELETE);
exports.Put = methodDecoratorFactory(Methods.PUT);
const ProtectedURL = () => {
    return function (target, propertyKey, descriptor) {
        const controllerClass = target.constructor;
        const routers = Reflect.hasMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass)
            ? Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass)
            : [];
        for (let route of routers) {
            route.jwtMiddleware = jwt_token_1.JWT.verifyToken;
        }
        Reflect.defineMetadata(metadata_keys_1.MetadataKeys.ROUTERS, routers, controllerClass);
    };
};
exports.ProtectedURL = ProtectedURL;
