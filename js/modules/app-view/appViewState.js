import { APP_VIEW_INITIAL_SCREEN, APP_VIEW_ROLES, createInitialData } from './data/index.js';

export function createInitialState() {
  return {
    pantalla: APP_VIEW_INITIAL_SCREEN,
    modal: null,
    rol: 'estudiante',
    datos: createInitialData()
  };
}

export function createContext(raiz, escenario) {
  return {
    raiz: raiz,
    escenario: escenario,
    estado: createInitialState(),
    historial: [],
    temporizador: null,
    movimientoReducido: window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
  };
}

export function resetState(ctx) {
  ctx.estado.pantalla = APP_VIEW_INITIAL_SCREEN;
  ctx.estado.modal = null;
  ctx.estado.rol = 'estudiante';
  ctx.estado.datos = createInitialData();
  ctx.historial = [];
}

export function isValidRole(rol) {
  return APP_VIEW_ROLES.some(function (item) {
    return item.id === rol;
  });
}
