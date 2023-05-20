"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseScheme = void 0;
exports.BaseScheme = {
    createUserID: { type: Number },
    updateUserID: { type: Number },
    status: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
    createdAt: { type: Number, default: Math.floor(Date.now() / 1000) },
    updatedAt: { type: Number, default: Math.floor(Date.now() / 1000) },
};
