export type fechaType = 'Fecha' | 'FechaHora'
export type formatType=''
export function getFechaUnix(type?: fechaType, format?: formatType):number{
  const fechaActual = Date.now()
  if (type == 'Fecha') {
    const tiempoSegundos = 1000 * 60 * 60 * 24
    return Math.floor(fechaActual/tiempoSegundos)
  }else
  if (type == 'FechaHora') {
    const tiempoSegundos = 1000
    return Math.floor(fechaActual/tiempoSegundos)
  }else
   {  return Math.floor(fechaActual/1000)}
  
 }