"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFechaUnix = void 0;
function getFechaUnix(type, format) {
    const fechaActual = Date.now();
    if (type == 'Fecha') {
        const tiempoSegundos = 1000 * 60 * 60 * 24;
        return Math.floor(fechaActual / tiempoSegundos);
    }
    else if (type == 'FechaHora') {
        const tiempoSegundos = 1000;
        return Math.floor(fechaActual / tiempoSegundos);
    }
    else {
        return Math.floor(fechaActual / 1000);
    }
}
exports.getFechaUnix = getFechaUnix;
