import {
  VISTA_APP_PANTALLA_INICIAL,
  VISTA_APP_REGLAS,
  crearDatosIniciales,
  leerDato,
  asignarDato,
  VISTA_APP_ROLES
} from './datosIniciales.js';
import { pantallasAuth } from './pantallasAuth.js';
import { pantallasEstudiante } from './pantallasEstudiante.js';
import { pantallasReporte } from './pantallasReporte.js';
import { pantallasDocente } from './pantallasDocente.js';
import { pantallasSoporte } from './pantallasSoporte.js';
import { modales } from './modales.js';

var pantallas = [].concat(pantallasAuth, pantallasEstudiante, pantallasReporte, pantallasDocente, pantallasSoporte);

export const VISTA_APP_PANTALLAS = pantallas.reduce(function (mapa, item) {
  mapa[item.id] = item;
  return mapa;
}, {});

export const VISTA_APP_MODALES = modales.reduce(function (mapa, item) {
  mapa[item.id] = item;
  return mapa;
}, {});

export {
  VISTA_APP_PANTALLA_INICIAL,
  VISTA_APP_REGLAS,
  crearDatosIniciales,
  leerDato,
  asignarDato,
  VISTA_APP_ROLES
};
