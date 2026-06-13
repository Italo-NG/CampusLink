import { VISTA_APP_PANTALLA_INICIAL, VISTA_APP_ROLES, crearDatosIniciales } from './datos/index.js';

export function crearEstadoInicial() {
  return {
    pantalla: VISTA_APP_PANTALLA_INICIAL,
    modal: null,
    rol: 'estudiante',
    datos: crearDatosIniciales()
  };
}

export function crearContexto(raiz, escenario) {
  return {
    raiz: raiz,
    escenario: escenario,
    estado: crearEstadoInicial(),
    historial: [],
    temporizador: null,
    movimientoReducido: window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
  };
}

export function reiniciarEstado(ctx) {
  ctx.estado.pantalla = VISTA_APP_PANTALLA_INICIAL;
  ctx.estado.modal = null;
  ctx.estado.rol = 'estudiante';
  ctx.estado.datos = crearDatosIniciales();
  ctx.historial = [];
}

export function rolValido(rol) {
  return VISTA_APP_ROLES.some(function (item) {
    return item.id === rol;
  });
}
