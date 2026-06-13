import { VISTA_APP_MODALES, VISTA_APP_PANTALLAS, VISTA_APP_ROLES } from './datos/index.js';
import { rolValido } from './vistaAppEstado.js';
import { cancelarTemporizador, pintarPantalla, ponerOverlay } from './vistaAppAnimacion.js';

var destinosPorRol = {
  estudiante: {
    home: 'dashboard-estudiante',
    perfil: 'perfil-estudiante',
    mapa: 'ubicacion-manual',
    reportes: 'mis-reportes-activos',
    tickets: 'mis-reportes-activos',
    reportar: 'escaner-qr'
  },
  docente: {
    home: 'dashboard-docente',
    perfil: 'perfil-docente',
    mapa: 'ubicacion-manual',
    reportes: 'mis-reportes-activos',
    tickets: 'mis-reportes-activos',
    reportar: 'escaner-qr'
  },
  soporte: {
    home: 'dashboard-soporte',
    perfil: 'perfil-soporte',
    mapa: 'mapa-operativo',
    reportes: 'lista-tickets',
    tickets: 'lista-tickets',
    reportar: 'lista-tickets'
  }
};

var aliasDirectos = {
  home: true,
  perfil: true,
  mapa: true,
  reportes: true,
  tickets: true,
  reportar: true
};

export function destinoPorRol(ctx, alias) {
  var rol = rolValido(ctx.estado.rol) ? ctx.estado.rol : 'estudiante';
  return destinosPorRol[rol][alias] || destinosPorRol[rol].home;
}

export function resolverDestino(ctx, destino) {
  if (!destino) return null;

  if (aliasDirectos[destino]) {
    return destinoPorRol(ctx, destino);
  }

  if (destino === 'dashboard-estudiante' && ctx.estado.rol !== 'estudiante') {
    return destinoPorRol(ctx, 'home');
  }

  if (destino === 'perfil-estudiante' && ctx.estado.rol !== 'estudiante') {
    return destinoPorRol(ctx, 'perfil');
  }

  if (destino === 'mis-reportes-activos' && ctx.estado.rol === 'soporte') {
    return destinoPorRol(ctx, 'tickets');
  }

  if (destino === 'ubicacion-manual' && ctx.estado.rol === 'soporte') {
    return destinoPorRol(ctx, 'mapa');
  }

  return destino;
}

export function aplicarPreset(ctx, preset) {
  Object.keys(preset).forEach(function (clave) {
    var valor = preset[clave];
    ctx.estado.datos[clave] = valor && typeof valor === 'object' ? JSON.parse(JSON.stringify(valor)) : valor;
  });
}

export function resolverAlias(ctx, id) {
  var saltos = 0;
  var pantalla = VISTA_APP_PANTALLAS[id];
  while (pantalla && pantalla.alias && saltos < 3) {
    if (pantalla.preset) aplicarPreset(ctx, pantalla.preset);
    id = pantalla.alias;
    pantalla = VISTA_APP_PANTALLAS[id];
    saltos += 1;
  }
  return id;
}

export function usuarioPermitido(ctx, usuario) {
  return usuario === 'general' || usuario === 'shared' || usuario === ctx.estado.rol;
}

export function puedeAbrirPantalla(ctx, destino) {
  var pantalla = VISTA_APP_PANTALLAS[destino];
  return !!pantalla && usuarioPermitido(ctx, pantalla.usuario);
}

export function puedeAbrirModal(ctx, destino) {
  var modal = VISTA_APP_MODALES[destino];
  return !!modal && usuarioPermitido(ctx, modal.usuario);
}

export function destinoSeguro(ctx, destino) {
  var resuelto = resolverDestino(ctx, destino);

  if (VISTA_APP_PANTALLAS[resuelto]) {
    resuelto = resolverAlias(ctx, resuelto);
  }

  if (VISTA_APP_PANTALLAS[resuelto] && puedeAbrirPantalla(ctx, resuelto)) {
    return resuelto;
  }

  if (VISTA_APP_MODALES[resuelto] && puedeAbrirModal(ctx, resuelto)) {
    return resuelto;
  }

  if (VISTA_APP_PANTALLAS[resuelto]) {
    return destinoPorRol(ctx, 'home');
  }

  return null;
}

export function inferirTransicion(ctx, objetivo) {
  if (ctx.historial.length && ctx.historial[ctx.historial.length - 1] === objetivo) return 'atras';
  return 'adelante';
}

export function navegar(ctx, destino, opciones) {
  opciones = opciones || {};
  cancelarTemporizador(ctx);

  var objetivo = destinoSeguro(ctx, destino);
  if (!objetivo) return;

  if (VISTA_APP_PANTALLAS[objetivo]) {
    if (ctx.estado.pantalla === 'escaner-qr' && objetivo !== 'escaner-qr') {
      ctx.estado.datos.qrDetectado = false;
    }

    if (objetivo === ctx.estado.pantalla) {
      ctx.estado.modal = null;
      pintarPantalla(ctx, null);
      return;
    }

    var transicion = opciones.transicion || inferirTransicion(ctx, objetivo);
    if (transicion === 'atras') {
      ctx.historial.pop();
    } else {
      ctx.historial.push(ctx.estado.pantalla);
      if (ctx.historial.length > 40) ctx.historial.shift();
    }

    ctx.estado.pantalla = objetivo;
    ctx.estado.modal = null;
    pintarPantalla(ctx, transicion);
    return;
  }

  if (VISTA_APP_MODALES[objetivo]) {
    ctx.estado.modal = objetivo;
    ponerOverlay(ctx);
  }
}

export function continuarPorRol(ctx) {
  var rol = VISTA_APP_ROLES.find(function (item) {
    return item.id === ctx.estado.rol;
  });

  navegar(ctx, rol ? rol.destino : 'dashboard-estudiante');
}
