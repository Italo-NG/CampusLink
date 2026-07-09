import { APP_VIEW_MODALS, APP_VIEW_SCREENS, APP_VIEW_ROLES } from './data/index.js';
import { isValidRole } from './appViewState.js';
import { cancelTimer, paintScreen, showOverlay } from './appViewAnimation.js';

var targetsByRole = {
  estudiante: {
    home: 'student-dashboard',
    perfil: 'student-profile',
    mapa: 'campus-map',
    reportes: 'my-active-reports',
    tickets: 'my-active-reports',
    reportar: 'qr-scanner'
  },
  docente: {
    home: 'teacher-dashboard',
    perfil: 'teacher-profile',
    mapa: 'manual-location',
    reportes: 'my-active-reports',
    tickets: 'my-active-reports',
    reportar: 'qr-scanner'
  },
  soporte: {
    home: 'support-dashboard',
    perfil: 'support-profile',
    mapa: 'operations-map',
    reportes: 'ticket-list',
    tickets: 'ticket-list',
    reportar: 'ticket-list'
  }
};

var directAliases = {
  home: true,
  perfil: true,
  mapa: true,
  reportes: true,
  tickets: true,
  reportar: true
};

export function targetForRole(ctx, alias) {
  var role = isValidRole(ctx.estado.rol) ? ctx.estado.rol : 'estudiante';
  return targetsByRole[role][alias] || targetsByRole[role].home;
}

export function resolveTarget(ctx, target) {
  if (!target) return null;

  if (directAliases[target]) {
    return targetForRole(ctx, target);
  }

  if (target === 'student-dashboard' && ctx.estado.rol !== 'estudiante') {
    return targetForRole(ctx, 'home');
  }

  if (target === 'student-profile' && ctx.estado.rol !== 'estudiante') {
    return targetForRole(ctx, 'perfil');
  }

  if (target === 'my-active-reports' && ctx.estado.rol === 'soporte') {
    return targetForRole(ctx, 'tickets');
  }

  if (target === 'manual-location' && ctx.estado.rol === 'soporte') {
    return targetForRole(ctx, 'mapa');
  }

  return target;
}

export function applyPreset(ctx, preset) {
  Object.keys(preset).forEach(function (key) {
    var value = preset[key];
    ctx.estado.datos[key] = value && typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : value;
  });
}

export function resolveAlias(ctx, id) {
  var hops = 0;
  var screen = APP_VIEW_SCREENS[id];
  while (screen && screen.alias && hops < 3) {
    if (screen.preset) applyPreset(ctx, screen.preset);
    id = screen.alias;
    screen = APP_VIEW_SCREENS[id];
    hops += 1;
  }
  return id;
}

export function userAllowed(ctx, user) {
  return user === 'general' || user === 'shared' || user === ctx.estado.rol;
}

export function canOpenScreen(ctx, target) {
  var screen = APP_VIEW_SCREENS[target];
  return !!screen && userAllowed(ctx, screen.usuario);
}

export function canOpenModal(ctx, target) {
  var modal = APP_VIEW_MODALS[target];
  return !!modal && userAllowed(ctx, modal.usuario);
}

export function safeTarget(ctx, target) {
  var resolved = resolveTarget(ctx, target);

  if (APP_VIEW_SCREENS[resolved]) {
    resolved = resolveAlias(ctx, resolved);
  }

  if (APP_VIEW_SCREENS[resolved] && canOpenScreen(ctx, resolved)) {
    return resolved;
  }

  if (APP_VIEW_MODALS[resolved] && canOpenModal(ctx, resolved)) {
    return resolved;
  }

  if (APP_VIEW_SCREENS[resolved]) {
    return targetForRole(ctx, 'home');
  }

  return null;
}

export function inferTransition(ctx, target) {
  if (ctx.historial.length && ctx.historial[ctx.historial.length - 1] === target) return 'atras';
  return 'adelante';
}

export function navigate(ctx, target, options) {
  options = options || {};
  cancelTimer(ctx);

  var resolvedTarget = safeTarget(ctx, target);
  if (!resolvedTarget) return;

  if (APP_VIEW_SCREENS[resolvedTarget]) {
    if (ctx.estado.pantalla === 'qr-scanner' && resolvedTarget !== 'qr-scanner') {
      ctx.estado.datos.qrDetectado = false;
    }

    if (resolvedTarget === ctx.estado.pantalla) {
      ctx.estado.modal = null;
      paintScreen(ctx, null);
      return;
    }

    var transition = options.transicion || inferTransition(ctx, resolvedTarget);
    if (transition === 'atras') {
      ctx.historial.pop();
    } else {
      ctx.historial.push(ctx.estado.pantalla);
      if (ctx.historial.length > 40) ctx.historial.shift();
    }

    ctx.estado.pantalla = resolvedTarget;
    ctx.estado.modal = null;
    paintScreen(ctx, transition);
    return;
  }

  if (APP_VIEW_MODALS[resolvedTarget]) {
    ctx.estado.modal = resolvedTarget;
    showOverlay(ctx);
  }
}

export function continueByRole(ctx) {
  var role = APP_VIEW_ROLES.find(function (item) {
    return item.id === ctx.estado.rol;
  });

  navigate(ctx, role ? role.destino : 'student-dashboard');
}
